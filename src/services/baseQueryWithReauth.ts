import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './consts';
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from './token';

type TRefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      headers.set('authorization', accessToken);
    }

    return headers;
  },
});

const shouldRefreshToken = (error?: FetchBaseQueryError): boolean =>
  Boolean(error && (error.status === 401 || error.status === 403));

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (!shouldRefreshToken(result.error)) {
    return result;
  }

  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    clearTokens();
    return result;
  }

  const refreshResult = await baseQuery(
    {
      url: '/auth/token',
      method: 'POST',
      body: { token: refreshToken },
    },
    api,
    extraOptions
  );

  if (!refreshResult.data) {
    clearTokens();
    return result;
  }

  const tokens = refreshResult.data as TRefreshTokenResponse;
  setTokens(tokens.accessToken, tokens.refreshToken);

  result = await baseQuery(args, api, extraOptions);

  return result;
};
