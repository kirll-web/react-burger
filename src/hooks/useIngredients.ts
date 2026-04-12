import { useEffect, useState } from 'react';

import { getIngredients } from '@services/getIngredients';

import type { TIngredient } from '@utils/types';

type TUseIngredientsResult = {
  loading: boolean;
  ingredients: TIngredient[];
};

export const useIngredients = (): TUseIngredientsResult => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const loadIngredients = async (): Promise<void> => {
      const data = await getIngredients();
      setLoading(false);

      if (isCancelled) {
        return;
      }

      setIngredients(data);
    };

    void loadIngredients();

    return (): void => {
      isCancelled = true;
    };
  }, []);

  return {
    loading,
    ingredients,
  };
};
