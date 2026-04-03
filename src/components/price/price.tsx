import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import type { DefaultPropsWithoutChildren } from '@utils/types';

import styles from './price.module.css';

type PriceProps = DefaultPropsWithoutChildren & {
  price: number;
};

export const Price = ({ className, price }: PriceProps): React.JSX.Element => {
  return (
    <span className={clsx(styles.price, className)}>
      <span className={'mr-1'}> {price}</span>
      <CurrencyIcon type="primary" />
    </span>
  );
};
