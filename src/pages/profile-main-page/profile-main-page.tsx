import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';

import { useFieldState } from '@hooks/use-field-state';
import { useUpdateUserMutation } from '@services/authApi';
import { getUser } from '@services/slices/auth-slice';
import { useAppSelector } from '@services/store';

import type { FormEvent, ReactElement } from 'react';

import styles from './profile-main-page.module.css';

export const ProfileMainPage = (): ReactElement => {
  const user = useAppSelector((state) => getUser(state));
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const { value: name, handleChange: handleChangeName } = useFieldState();
  const { value: email, handleChange: handleEmailChange } = useFieldState();
  const {
    value: password,
    handleChange: handleChangePassword,
    showValue: showPassword,
    toggleShowValue: togglePassword,
  } = useFieldState();

  useEffect(() => {
    handleChangeName(user?.name ?? '');
    handleEmailChange(user?.email ?? '');
    handleChangePassword('');
  }, [
    handleEmailChange,
    handleChangeName,
    handleChangePassword,
    user?.email,
    user?.name,
  ]);

  const isDirty =
    name !== (user?.name ?? '') || email !== (user?.email ?? '') || password !== '';

  const handleCancel = (): void => {
    handleChangeName(user?.name ?? '');
    handleEmailChange(user?.email ?? '');
    handleChangePassword('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    await updateUser({
      name,
      email,
      password,
    }).unwrap();

    handleChangePassword('');
  };

  return (
    <form
      className={styles.containter}
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
    >
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
        name="password"
        placeholder="Пароль"
        size="default"
        onIconClick={togglePassword}
        onChange={handleChangePassword}
        type={showPassword ? 'text' : 'password'}
        icon={showPassword ? 'HideIcon' : 'ShowIcon'}
        value={password}
      />
      {isDirty && (
        <div className={styles.actions}>
          <Button
            onClick={handleCancel}
            htmlType={'button'}
            type="secondary"
            size="medium"
          >
            Отмена
          </Button>
          <Button disabled={isLoading} htmlType={'submit'} type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
