import { Input } from '@krgaa/react-developer-burger-ui-components';

import { Form } from '@components/form';
import { useFieldState } from '@hooks/use-field-state';

import type { ReactElement } from 'react';

import styles from './forgot-password-page.module.css';

export const ForgotPasswordPage = (): ReactElement => {
  const { value: email, handleChange: handleChangeEmail } = useFieldState();

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
      />
    </main>
  );
};
