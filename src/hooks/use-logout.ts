import { useLogoutMutation } from '@services/authApi';
import { clearTokens, getRefreshToken } from '@services/token';

export const useLogout = () => {
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = (): void => {
    if (isLoading) {
      return;
    }

    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearTokens();
      return;
    }

    void logout({ token: refreshToken });
  };

  return { isLoading, handleLogout };
};
