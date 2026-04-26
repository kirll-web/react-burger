import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@utils/types';
type SelectedIngredientState = {
  selectedIngredient: TIngredient | undefined;
};

const initialState: SelectedIngredientState = {
  selectedIngredient: undefined,
};

export enum ActionType {
  SELECT_INGREDIENT = 'SELECT_INGREDIENT',
  UNSELECT_INGREDIENT = 'UNSELECT_INGREDIENT',
}

export const selectedIngredientSlice = createSlice({
  name: 'selectedIngredient',
  initialState,
  reducers: {
    selectIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.selectedIngredient = action.payload;
    },
    unselectIngredient: (state) => {
      state.selectedIngredient = undefined;
    },
  },
  selectors: {
    getSelectedIngredient: (state) => state.selectedIngredient,
  },
});

export const selectedIngredientReducer = selectedIngredientSlice.reducer;
export const { selectIngredient, unselectIngredient } = selectedIngredientSlice.actions;
export const getSelectedIngredient =
  selectedIngredientSlice.selectors.getSelectedIngredient;
