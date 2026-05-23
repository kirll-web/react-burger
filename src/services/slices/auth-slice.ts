import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TUser } from '@services/authApi';
import type { RootState } from '@services/store';

type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
  },
});

export const { clearUser, setAuthChecked, setUser } = authSlice.actions;

export const getUser = (state: RootState): TUser | null => state[authSlice.name].user;

export const getIsAuthChecked = (state: RootState): boolean =>
  state[authSlice.name].isAuthChecked;
