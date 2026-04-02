import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';

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

//TODO burget-ingredient возможно стоит назвать burger-ingredient-card,
// TODO так как он отображает карточку ингредиента, а не просто ингредиент.
// TODO И в дальнейшем  будет добавлено отображение ингредиента без карточки, например в конструкторе бургера.
// TODO поэтому возможна проблема с колизией наименований и сложностью выбора наименования
