import { configureStore } from '@reduxjs/toolkit';

import { ingredientsApi } from '@services/ingredientsApi';

import {
  selectedIngredientReducer,
  selectedIngredientSlice,
} from './slices/ingredient-modal-slice';

export const store = configureStore({
  reducer: {
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    [selectedIngredientSlice.reducerPath]: selectedIngredientReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
