import { Input } from '@krgaa/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { RoutePath } from '@components/app/router';
import { getRouteFromState } from '@components/app/router/get-route-from-state';
import { Form } from '@components/form';
import { useFieldState } from '@hooks/use-field-state';
import { useLoginMutation } from '@services/authApi';

import type { FormEvent, ReactElement } from 'react';

import styles from './login-page.module.css';
export const LoginPage = (): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();

  const { value: email, handleChange: handleChangeEmail } = useFieldState();
  const {
    value: password,
    handleChange: handleChangePassword,
    showValue: showPassword,
    toggleShowValue: togglePassword,
  } = useFieldState();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    await login({ email, password }).unwrap();
    void navigate(getRouteFromState(location.state), { replace: true });
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
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
        links={
          <>
            <span>
              Вы - новый пользователь?
              <Link to={RoutePath.Login}>Зарегистрироваться</Link>
            </span>
            <span>
              Забыли пароль?
              <Link to={RoutePath.ForgotPassword}>Восстановить пароль</Link>
            </span>
          </>
        }
      />
    </main>
  );
};
