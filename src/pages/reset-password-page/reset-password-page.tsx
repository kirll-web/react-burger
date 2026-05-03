import { Input } from '@krgaa/react-developer-burger-ui-components';

import { Form } from '@components/form';
import { useFieldState } from '@hooks/use-field-state';

import type { ReactElement } from 'react';

import styles from './reset-password-page.module.css';

export const ResetPasswordPage = (): ReactElement => {
  const {
    value: password,
    handleChange: handleChangePassword,
    showValue: showPassword,
    toggleShowValue: togglePassword,
  } = useFieldState();
  const { value: code, handleChange: handleCodeChange } = useFieldState();

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
      />
    </main>
  );
};
