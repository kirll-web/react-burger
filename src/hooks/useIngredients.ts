import { getIngredients } from '@/services/getIngredients';
import { useEffect, useState } from 'react';

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

      if (isCancelled) {
        return;
      }

      setIngredients(data);
      setLoading(false);
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
