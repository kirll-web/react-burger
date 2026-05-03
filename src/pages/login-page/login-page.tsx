import { Input } from '@krgaa/react-developer-burger-ui-components';

import { Form } from '@components/form';
import { useFieldState } from '@hooks/use-field-state';
import { useLoginMutation } from '@services/authApi';

import type { FormEvent, ReactElement } from 'react';

import styles from './login-page.module.css';
export const LoginPage = (): ReactElement => {
  const [login, { isLoading }] = useLoginMutation();

  const { value: email, handleChange: handleChangeEmail } = useFieldState();
  const {
    value: password,
    handleChange: handleChangePassword,
    showValue: showPassword,
    toggleShowValue: togglePassword,
  } = useFieldState();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void login({ email, password });
  };

  return (
    <main className={styles.main}>
      <Form
        title={'Вход'}
        inputs={[
          <Input
            key="email"
            name="email"
            placeholder="E-mail"
            size="default"
            onChange={handleChangeEmail}
            type="email"
            value={email}
          />,
          <Input
            key="password"
            name="password"
            placeholder="Пароль"
            size="default"
            onIconClick={togglePassword}
            onChange={handleChangePassword}
            type={showPassword ? 'text' : 'password'}
            icon={showPassword ? 'HideIcon' : 'ShowIcon'}
            value={password}
          />,
        ]}
        submitButtonText={'Войти'}
        buttonDisabled={isLoading}
        onSubmit={handleSubmit}
      />
    </main>
  );
};
