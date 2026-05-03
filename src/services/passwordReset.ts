const RESET_PASSWORD_FLAG_KEY = 'isResetPasswordAllowed';

export const isResetPasswordAllowed = (): boolean =>
  localStorage.getItem(RESET_PASSWORD_FLAG_KEY) === 'true';

export const allowResetPassword = (): void => {
  localStorage.setItem(RESET_PASSWORD_FLAG_KEY, 'true');
};

export const clearResetPasswordPermission = (): void => {
  localStorage.removeItem(RESET_PASSWORD_FLAG_KEY);
};
