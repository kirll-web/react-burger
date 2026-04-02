import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';

import type { DefaultPropsWithoutChildren, TIngredient } from '@utils/types';

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
    <li className={clsx(className)}>
      <ConstructorElement
        isLocked={isLocked}
        type={type}
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
      />
    </li>
  );
};
