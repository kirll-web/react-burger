import { Input } from '@krgaa/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

import { RoutePath } from '@components/app/router/routes';
import { Form } from '@components/form';
import { useFieldState } from '@hooks/use-field-state';
import { useForgotPasswordMutation } from '@services/authApi';
import { allowResetPassword } from '@services/passwordReset';

import type { FormEvent, ReactElement } from 'react';

import styles from './forgot-password-page.module.css';

export const ForgotPasswordPage = (): ReactElement => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const { value: email, handleChange: handleChangeEmail } = useFieldState();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    await forgotPassword({ email }).unwrap();
    allowResetPassword();
    void navigate(RoutePath.ResetPassword);
  };

  return (
    <main className={styles.main}>
      <Form
        title={'Восстановление пароля'}
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
        ]}
        submitButtonText={'Восстановить'}
        buttonDisabled={isLoading}
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
      />
    </main>
  );
};
