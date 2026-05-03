import { Input } from '@krgaa/react-developer-burger-ui-components';

import { useFieldState } from '@hooks/use-field-state';

import type { ReactElement } from 'react';

import styles from './profile-main-page.module.css';

export const ProfileMainPage = (): ReactElement => {
  const { value: name, handleChange: handleChangeName } = useFieldState('Марк');
  const { value: email, handleChange: handleEmailChange } =
    useFieldState('mail@stellar.burgers');
  const {
    value: password,
    handleChange: handleChangePassword,
    showValue: showPassword,
    toggleShowValue: togglePassword,
  } = useFieldState('password');

  return (
    <section className={styles.containter}>
      <Input
        name="name"
        placeholder="Имя"
        size="default"
        onChange={handleChangeName}
        type="text"
        value={name}
        icon="EditIcon"
      />
      <Input
        name="email"
        placeholder="E-mail"
        size="default"
        onChange={handleEmailChange}
        type="email"
        value={email}
        icon="EditIcon"
      />
      <Input
        name="email"
        placeholder="Пароль"
        size="default"
        onIconClick={togglePassword}
        onChange={handleChangePassword}
        type={showPassword ? 'text' : 'password'}
        icon="EditIcon"
        value={password}
      />
    </section>
  );
};
