import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import type { ReactElement } from 'react';

import styles from './burger-constructor-placeholder.module.css';

type TBurgerConstructorPlaceholderProps = {
  type?: 'top' | 'bottom';
  text: string;
};

const transparentPixel =
  'data:image/;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

export const BurgerConstructorPlaceholder = ({
  type,
  text,
}: TBurgerConstructorPlaceholderProps): ReactElement => {
  return (
    <div>
      <ConstructorElement
        isLocked={true}
        type={type}
        thumbnail={transparentPixel}
        price={0}
        text={text}
        extraClass={clsx('ml-8', styles.element)}
      />
    </div>
  );
};
