import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './consts';

type TOrderResponse = {
  name: string;
  order: {
    number: number;
  };
  success: true;
};

type TOrderRequest = string[];

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    order: builder.mutation<TOrderResponse, TOrderRequest>({
      query: (ingredients: string[]) => ({
        url: '/orders',
        method: 'POST',
        body: {
          ingredients,
        },
      }),
    }),
  }),
});

export const { useOrderMutation } = ordersApi;
