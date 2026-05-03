import { Button } from '@krgaa/react-developer-burger-ui-components';

import type { FormEvent } from 'react';

import styles from './form.module.css';
type TFormProps = {
  title: string;
  inputs: React.JSX.Element[];
  submitButtonText: string;
  buttonDisabled?: boolean;

  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
};

export const Form = ({
  title,
  inputs,
  submitButtonText,
  buttonDisabled,

  onSubmit,
}: TFormProps): React.JSX.Element => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <h2 className="text text_type_main-large">{title}</h2>
      {inputs}
      <Button disabled={buttonDisabled} size="large" type="primary" htmlType={'submit'}>
        {submitButtonText}
      </Button>
    </form>
  );
};
