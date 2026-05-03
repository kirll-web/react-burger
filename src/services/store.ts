import { configureStore } from '@reduxjs/toolkit';

import { authApi } from '@services/authApi';
import { ingredientsApi } from '@services/ingredientsApi';

import { ordersApi } from './ordersApi';
import { constructorSlice } from './slices/constructor-slice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [constructorSlice.reducerPath]: constructorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(ingredientsApi.middleware)
      .concat(ordersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
