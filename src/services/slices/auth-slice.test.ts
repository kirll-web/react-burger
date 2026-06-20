import {
  authSlice,
  clearUser,
  getIsAuthChecked,
  getUser,
  setAuthChecked,
  setUser,
} from './auth-slice';

import type { TUser } from '@services/authApi';
import type { RootState } from '@services/store';

describe('authSlice', () => {
  const user: TUser = {
    email: 'test@example.com',
    name: 'Test User',
  };

  it('should return initial state', () => {
    const state = authSlice.reducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      user: null,
      isAuthChecked: false,
    });
  });

  it('should handle setUser', () => {
    const state = authSlice.reducer(undefined, setUser(user));

    expect(state.user).toEqual(user);
  });

  it('should handle clearUser', () => {
    const state = authSlice.reducer({ user, isAuthChecked: true }, clearUser());

    expect(state).toEqual({
      user: null,
      isAuthChecked: true,
    });
  });

  it('should handle setAuthChecked', () => {
    const state = authSlice.reducer(undefined, setAuthChecked(true));

    expect(state.isAuthChecked).toBe(true);
  });

  it('should select auth state values', () => {
    const rootState = {
      [authSlice.name]: {
        user,
        isAuthChecked: true,
      },
    } as RootState;

    expect(getUser(rootState)).toEqual(user);
    expect(getIsAuthChecked(rootState)).toBe(true);
  });
});
