import { Api, type ApiResponse } from '@/utils/request';

import type { TIngredient } from '@/utils/types';

type TIngredientsResponse = {
  data: TIngredient[];
};

export const getIngredients = async (): Promise<TIngredient[]> => {
  const response: ApiResponse<TIngredientsResponse> = await Api.executeRequest(() =>
    Api.getRequest('/ingredients')
  );

  if ('data' in response) {
    return response.data.data;
  }

  return [];
};
