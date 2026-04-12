import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import type { DefaultPropsWithoutChildren, TIngredient } from '@utils/types';

import styles from './burger-constructor-ingredient-list-item.module.css';

type TBurgerConstructorIngredientProps = DefaultPropsWithoutChildren & {
  ingredient: TIngredient;
  isLocked: boolean;
  type?: 'top' | 'bottom';
};

const getName = (name: string, type?: 'top' | 'bottom'): string => {
  switch (type) {
    case 'top':
      return `${name} (верх)`;
    case 'bottom':
      return `${name} (низ)`;
    default:
      return name;
  }
};

export const BurgerConstructorIngredientListItem = ({
  className,
  ingredient,
  isLocked,
  type,
}: TBurgerConstructorIngredientProps): React.JSX.Element => {
  const name = getName(ingredient.name, type);

  return (
    <li className={clsx(styles.wrapper, className)}>
      {!isLocked && <DragIcon type="primary" className={styles.drag} />}
      <ConstructorElement
        isLocked={isLocked}
        type={type}
        text={name}
        thumbnail={ingredient.image}
        price={ingredient.price}
        extraClass={clsx({
          ['ml-8']: isLocked,
        })}
      />
    </li>
  );
};
