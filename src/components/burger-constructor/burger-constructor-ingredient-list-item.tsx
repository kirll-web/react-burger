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

export const BurgerConstructorIngredientListItem = ({
  className,
  ingredient,
  isLocked,
  type,
}: TBurgerConstructorIngredientProps): React.JSX.Element => {
  return (
    <li className={clsx(styles.wrapper, className)}>
      {!isLocked && <DragIcon type="primary" className={styles.drag} />}
      <ConstructorElement
        isLocked={isLocked}
        type={type}
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
        extraClass={clsx({
          ['ml-8']: isLocked,
        })}
      />
    </li>
  );
};
