import { Button } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

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
      <div
        className={clsx(
          'text text_type_main-default  text_color_inactive mt-20',
          styles.links
        )}
      >
        {links}
      </div>
    </form>
  );
};
