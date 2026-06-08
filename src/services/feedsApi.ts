import { createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { DEFAULT_FEEDS_INFO } from '@utils/consts';

import { BASE_URL } from './consts';
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from './token';

import type { TFeed } from '@utils/types';

// Переменная хранит активное соединение
// и доступна всем эндпоинтам в этом файле
let socket: WebSocket;

export type TFeedsInfo = {
  success: boolean;
  orders: TFeed[];
  total: number;
  totalToday: number;
};

const PUBLIC_FEEDS_URL = 'wss://new-stellarburgers.education-services.ru/orders/all';
const PRIVATE_FEEDS_URL = 'wss://new-stellarburgers.education-services.ru/orders';

const isTFeedsInfo = (data: unknown): data is TFeedsInfo => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  if ('success' in data && 'orders' in data && 'total' in data && 'totalToday' in data) {
    const { success, orders, total, totalToday } = data as TFeedsInfo;

    return (
      typeof success === 'boolean' &&
      Array.isArray(orders) &&
      typeof total === 'number' &&
      typeof totalToday === 'number'
    );
  }

  return false;
};

type TRefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

const refreshToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  console.log('Попытка обновить токен с помощью refreshToken:', refreshToken);

  if (!refreshToken) {
    clearTokens();
    return null;
  }

  const response = await fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });

  if (!response.ok) {
    clearTokens();
    return null;
  }

  const data = (await response.json()) as TRefreshTokenResponse;

  if (!data.success) {
    clearTokens();
    return null;
  }

  setTokens(data.accessToken, data.refreshToken);

  return data.accessToken.replace('Bearer ', '');
};

const getSocketUrl = (withToken: boolean): string => {
  if (!withToken) {
    return PUBLIC_FEEDS_URL;
  }

  const token = getAccessToken()?.replace('Bearer ', '');

  return token ? `${PRIVATE_FEEDS_URL}?token=${token}` : PRIVATE_FEEDS_URL;
};

const applyFeedsUpdate = (draft: TFeedsInfo, data: TFeedsInfo): void => {
  draft.success = data.success;
  draft.orders = [...data.orders].sort((a, b) => (a.number > b.number ? -1 : 1));
  draft.total = data.total;
  draft.totalToday = data.totalToday;
};

const isInvalidTokenMessage = (data: unknown): data is { message: string } =>
  typeof data === 'object' &&
  data !== null &&
  'message' in data &&
  data.message === 'Invalid or missing token';

const getInitialFeedsState = (): { data: TFeedsInfo } => ({
  data: DEFAULT_FEEDS_INFO,
});

export const feedsApi = createApi({
  reducerPath: 'feedsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getAllFeeds: builder.query<TFeedsInfo, void>({
      queryFn: getInitialFeedsState,

      async onCacheEntryAdded(_, lifecycleApi) {
        const RECONNECT_PERIOD = 3000;

        let reconnectTimerId: ReturnType<typeof setTimeout> | undefined = undefined;
        let isUnsubscribed = false;

        const connect = () => {
          if (reconnectTimerId) {
            clearTimeout(reconnectTimerId);
            reconnectTimerId = undefined;
          }

          socket = new WebSocket(getSocketUrl(false));

          socket.onclose = () => {
            console.log(
              'Соединение разорвано. Проверка необходимости переподключения...'
            );

            if (!isUnsubscribed) {
              reconnectTimerId = setTimeout(() => connect(), RECONNECT_PERIOD);
            }
          };

          socket.onerror = (error) => {
            console.error('Ошибка WebSocket:', error);
          };

          socket.onmessage = (event?: { data?: string }) => {
            const data: unknown = JSON.parse(event?.data ?? '{}');

            if (!isTFeedsInfo(data)) {
              console.error(
                'Полученные данные не соответствуют формату TFeedsInfo:',
                data
              );
              return;
            }

            lifecycleApi.updateCachedData((draft) => {
              applyFeedsUpdate(draft, data);
            });
          };
        };

        // Запускаем первое подключение
        connect();
        try {
          await lifecycleApi.cacheDataLoaded;
        } catch {
          /* empty */
        }

        try {
          await lifecycleApi.cacheEntryRemoved;
        } finally {
          isUnsubscribed = true;

          clearTimeout(reconnectTimerId);
          socket?.close();
        }
        socket.close();
      },
    }),
    getFeedsByToken: builder.query<TFeedsInfo, void>({
      queryFn: getInitialFeedsState,

      async onCacheEntryAdded(_, lifecycleApi) {
        const RECONNECT_PERIOD = 3000;

        let reconnectTimerId: ReturnType<typeof setTimeout> | undefined = undefined;
        let isUnsubscribed = false;

        const connect = () => {
          if (reconnectTimerId) {
            clearTimeout(reconnectTimerId);
            reconnectTimerId = undefined;
          }

          socket = new WebSocket(getSocketUrl(true));

          socket.onclose = () => {
            console.log(
              'Соединение разорвано. Проверка необходимости переподключения...'
            );

            if (!isUnsubscribed) {
              reconnectTimerId = setTimeout(() => connect(), RECONNECT_PERIOD);
            }
          };

          socket.onerror = (error) => {
            console.error('Ошибка WebSocket:', error);
          };

          socket.onmessage = async (event?: { data?: string }) => {
            const data: unknown = JSON.parse(event?.data ?? '{}');

            if (isInvalidTokenMessage(data)) {
              const token = await refreshToken();

              if (!token) {
                console.error('Не удалось обновить токен');
                return;
              }

              socket.close();
              connect();
              return;
            }

            if (!isTFeedsInfo(data)) {
              console.error(
                'Полученные данные не соответствуют формату TFeedsInfo:',
                data
              );
              return;
            }

            lifecycleApi.updateCachedData((draft) => {
              applyFeedsUpdate(draft, data);
            });
          };
        };

        connect();
        try {
          await lifecycleApi.cacheDataLoaded;
        } catch {
          /* empty */
        }

        try {
          await lifecycleApi.cacheEntryRemoved;
        } finally {
          isUnsubscribed = true;

          clearTimeout(reconnectTimerId);
          socket?.close();
        }
        socket.close();
      },
    }),
  }),
});

export const { useGetAllFeedsQuery, useGetFeedsByTokenQuery } = feedsApi;
const selectAllFeedsResult = feedsApi.endpoints.getAllFeeds.select();
const selectFeedsByTokenResult = feedsApi.endpoints.getFeedsByToken.select();

export const selectAllFeedOrderById = (id?: string) =>
  createSelector(selectAllFeedsResult, (result) =>
    id ? result.data?.orders.find((order) => order._id === id) : undefined
  );

export const selectFeedOrderByTokenId = (id?: string) =>
  createSelector(selectFeedsByTokenResult, (result) =>
    id ? result.data?.orders.find((order) => order._id === id) : undefined
  );
