import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './consts';

import type { TIngredient } from '@utils/types';

type TIngredientsResponse = {
  data: TIngredient[];
};

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredient[], void>({
      query: () => '/ingredients',
      transformResponse: (response: TIngredientsResponse) => response.data,
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;

export const useGetIngredientByIdQuery = (id?: string) =>
  useGetIngredientsQuery(undefined, {
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      ingredient: data?.find((ingredient) => ingredient._id === id),
    }),
  });
