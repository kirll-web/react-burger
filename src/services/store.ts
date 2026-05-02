import { configureStore } from '@reduxjs/toolkit';

import { ingredientsApi } from '@services/ingredientsApi';

import { ordersApi } from './ordersApi';
import { constructorSlice } from './slices/constructor-slice';

export const store = configureStore({
  reducer: {
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [constructorSlice.reducerPath]: constructorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ingredientsApi.middleware)
      .concat(ordersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
