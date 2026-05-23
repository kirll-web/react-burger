import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './baseQueryWithReauth';

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
  baseQuery: baseQueryWithReauth,
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
