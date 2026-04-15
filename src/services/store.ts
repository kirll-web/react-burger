import { configureStore } from '@reduxjs/toolkit';

import { ingredientsApi } from '@services/ingredientsApi';

import { ordersApi } from './ordersApi';
import {
  selectedIngredientReducer,
  selectedIngredientSlice,
} from './slices/ingredient-modal-slice';

export const store = configureStore({
  reducer: {
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [selectedIngredientSlice.reducerPath]: selectedIngredientReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ingredientsApi.middleware)
      .concat(ordersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
