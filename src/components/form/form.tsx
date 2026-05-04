import { Button } from '@krgaa/react-developer-burger-ui-components';

import type { FormEvent, ReactElement, ReactNode } from 'react';

import styles from './form.module.css';
type TFormProps = {
  title: string;
  inputs: ReactElement[];
  submitButtonText: string;
  buttonDisabled?: boolean;
  links?: ReactNode;

  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
};

export const Form = ({
  title,
  inputs,
  submitButtonText,
  buttonDisabled,
  links,

  onSubmit,
}: TFormProps): React.JSX.Element => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <h2 className="text text_type_main-large">{title}</h2>
      {inputs}
      <Button disabled={buttonDisabled} size="large" type="primary" htmlType={'submit'}>
        {submitButtonText}
      </Button>
      {links}
    </form>
  );
};
