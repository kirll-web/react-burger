import { BurgerConstructorIngredientListItem } from './burger-constructor-ingredient-list-item';
import { BurgerConstructorPlaceholder } from './burger-constructor-placeholder';

import type { DefaultPropsWithChildren, TIngredient } from '@utils/types';

type TBurgerConstructorBunWrapperProps = DefaultPropsWithChildren & {
  bun: TIngredient | undefined;
};

export const BurgerConstructorBunWrapper = ({
  bun,
  children,
}: TBurgerConstructorBunWrapperProps): React.JSX.Element => {
  if (bun) {
    return (
      <>
        <BurgerConstructorIngredientListItem
          className="mr-5"
          ingredient={bun}
          isLocked={true}
          type="top"
        />
        {children}
        <BurgerConstructorIngredientListItem
          className="mr-5"
          ingredient={bun}
          isLocked={true}
          type="bottom"
        />
      </>
    );
  }

  return (
    <>
      <BurgerConstructorPlaceholder type={'top'} text={'Сюда перетащи булку, быстро!'} />
      {children}
      <BurgerConstructorPlaceholder
        type={'bottom'}
        text={'Сюда перетащи булку, быстро!'}
      />
    </>
  );
};
