import { Input } from '@krgaa/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

import { RoutePath } from '@components/app/router';
import { getRouteFromState } from '@components/app/router/get-route-from-state';
import { Form } from '@components/form';
import { useFieldState } from '@hooks/use-field-state';
import { useRegisterMutation } from '@services/authApi';

import type { ReactElement } from 'react';

import styles from './register-page.module.css';

export const RegisterPage = (): ReactElement => {
  const location = useLocation();
  const [register, { isLoading }] = useRegisterMutation();

  const { value: name, handleChange: handleChangeName } = useFieldState();
  const { value: email, handleChange: handleChangeEmail } = useFieldState();
  const {
    value: password,
    handleChange: handleChangePassword,
    showValue: showPassword,
    toggleShowValue: togglePassword,
  } = useFieldState();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    void register({
      email,
      password,
      name,
    });
  };

  return (
    <main className={styles.main}>
      <Form
        title={'Регистрация'}
        inputs={[
          <Input
            key="name"
            name="name"
            placeholder="Имя"
            size="default"
            onChange={handleChangeName}
            type="text"
            value={name}
          />,
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
        submitButtonText={'Зарегистрироваться'}
        buttonDisabled={isLoading}
        onSubmit={handleSubmit}
        links={
          <span>
            Уже зарегистрированы?{' '}
            <Link
              to={RoutePath.Login}
              state={{ from: { pathname: getRouteFromState(location.state) } }}
            >
              Войти
            </Link>
          </span>
        }
      />
    </main>
  );
};
