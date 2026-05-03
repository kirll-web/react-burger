import { Input } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutePath } from '@components/app/router/routes';
import { Form } from '@components/form';
import { useFieldState } from '@hooks/use-field-state';
import { useResetPasswordMutation } from '@services/authApi';
import {
  clearResetPasswordPermission,
  isResetPasswordAllowed,
} from '@services/passwordReset';

import type { FormEvent, ReactElement } from 'react';

import styles from './reset-password-page.module.css';

export const ResetPasswordPage = (): ReactElement => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    value: password,
    handleChange: handleChangePassword,
    showValue: showPassword,
    toggleShowValue: togglePassword,
  } = useFieldState();
  const { value: code, handleChange: handleCodeChange } = useFieldState();

  useEffect(() => {
    if (!isResetPasswordAllowed()) {
      void navigate(RoutePath.ForgotPassword);
    }
  }, [navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    await resetPassword({ password, token: code }).unwrap();
    clearResetPasswordPermission();
    void navigate(RoutePath.Login);
  };

  return (
    <main className={styles.main}>
      <Form
        title={'Восстановление пароля'}
        inputs={[
          <Input
            key="password"
            name="password"
            placeholder="Введите новый пароль"
            size="default"
            onIconClick={togglePassword}
            onChange={handleChangePassword}
            type={showPassword ? 'text' : 'password'}
            icon={showPassword ? 'HideIcon' : 'ShowIcon'}
            value={password}
          />,
          <Input
            key="code"
            name="code"
            placeholder="Введите код из письма"
            size="default"
            onChange={handleCodeChange}
            type="text"
            value={code}
          />,
        ]}
        submitButtonText={'Сохранить'}
        buttonDisabled={isLoading}
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
      />
    </main>
  );
};
