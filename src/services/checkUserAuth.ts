import { authApi } from '@services/authApi';
import { clearUser, setAuthChecked, setUser } from '@services/slices/auth-slice';
import { clearTokens, getAccessToken, getRefreshToken } from '@services/token';

import type { AppDispatch } from '@services/store';

export const checkUserAuth =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    const hasTokens = Boolean(getAccessToken() && getRefreshToken());

    if (!hasTokens) {
      dispatch(clearUser());
      dispatch(setAuthChecked(true));
      return;
    }

    try {
      const data = await dispatch(
        authApi.endpoints.getUser.initiate(undefined, { subscribe: false })
      ).unwrap();

      dispatch(setUser(data.user));
    } catch {
      clearTokens();
      dispatch(clearUser());
    } finally {
      dispatch(setAuthChecked(true));
    }
  };
