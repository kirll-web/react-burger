import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@services/store';
import type { TIngredient } from '@utils/types';

export type TConstuctorIngredient = {
  index: number;
  ingredient: TIngredient;
};

type TConstructorState = {
  bun: TIngredient | undefined;
  ingredients: TConstuctorIngredient[];
  nextIndex: number;
};

const initialState: TConstructorState = {
  bun: undefined,
  ingredients: [],
  nextIndex: 1,
};

export enum ActionType {
  SELECT_INGREDIENT = 'SELECT_INGREDIENT',
  UNSELECT_INGREDIENT = 'UNSELECT_INGREDIENT',
}

export const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    selectIngredient: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.bun = { ...ingredient };
      } else {
        state.ingredients.push({
          index: state.nextIndex,
          ingredient: { ...ingredient },
        });
        state.nextIndex += 1;
      }
    },
    unselectIngredient: (state, action: PayloadAction<TConstuctorIngredient>) => {
      const ingredient = action.payload;
      state.ingredients = state.ingredients.filter(
        (item) => item.index !== ingredient.index
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;

      if (
        fromIndex === toIndex ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= state.ingredients.length ||
        toIndex >= state.ingredients.length
      ) {
        return;
      }

      const [movedIngredient] = state.ingredients.splice(fromIndex, 1);

      if (!movedIngredient) {
        return;
      }

      state.ingredients.splice(toIndex, 0, movedIngredient);
    },
  },
});

export const constructorReducer = constructorSlice.reducer;
export const {
  selectIngredient: selectConsturctorIngredient,
  unselectIngredient: unselectConsturctorIngredient,
  moveIngredient: moveConsturctorIngredient,
} = constructorSlice.actions;
export const getConstructorIngredients = (state: RootState): TConstuctorIngredient[] =>
  state.constructorSlice.ingredients;
export const getConstructorBun = (state: RootState): TIngredient | undefined =>
  state.constructorSlice.bun;

export const makeGetIngredientCounter = (): ((
  state: RootState,
  item: TIngredient
) => number) =>
  createSelector(
    [
      (state: RootState): TConstuctorIngredient[] => state.constructorSlice.ingredients,
      (state: RootState): TIngredient | undefined => state.constructorSlice.bun,
      (_: RootState, item: TIngredient): TIngredient => item,
    ],
    (ingredients, bun, item): number => {
      if (item.type === 'bun') {
        return bun && bun._id === item._id ? 2 : 0;
      }

      return ingredients.reduce(
        (acc, ingredient) => acc + Number(item._id === ingredient.ingredient._id),
        0
      );
    }
  );

export const getPrice = createSelector(
  [(state: RootState): TConstructorState => state.constructorSlice],
  ({ ingredients, bun }): number => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (acc, ingredient) => acc + ingredient.ingredient.price,
      0
    );

    return bunPrice + ingredientsPrice;
  }
);
