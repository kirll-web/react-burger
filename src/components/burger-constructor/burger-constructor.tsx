import { Button } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';

import { Price } from '../price';
import { BurgerConstructorIngredientListItem } from './burger-constructor-ingredient-list-item';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const [bunTop, ...ingredientsWithBunBottom] = ingredients;
  const bunBottom = ingredientsWithBunBottom[ingredientsWithBunBottom.length - 1];
  const mainIngredients = ingredientsWithBunBottom.slice(0, -1);

  return (
    <section className={clsx(styles.burger_constructor, 'pl-4 pr-4 pt-1')}>
      <div className={styles.ingredients}>
        <BurgerConstructorIngredientListItem
          className="mr-5"
          ingredient={bunTop}
          isLocked={true}
          type="top"
        />
        <ul className={clsx(styles.ingredients_main, 'custom-scroll')}>
          {mainIngredients.map((ingredient) => (
            <BurgerConstructorIngredientListItem
              key={ingredient._id}
              className="mr-5"
              ingredient={ingredient}
              isLocked={false}
            />
          ))}
        </ul>
        <BurgerConstructorIngredientListItem
          className="mr-5"
          ingredient={bunBottom}
          isLocked={true}
          type="bottom"
        />
      </div>
      <footer className={clsx(styles.footer, 'mt-10')}>
        <Price price={50} className="text_type_digits-medium" />
        <Button size="large" type="primary" htmlType={'button'}>
          Оформить заказ
        </Button>
      </footer>
    </section>
  );
};
