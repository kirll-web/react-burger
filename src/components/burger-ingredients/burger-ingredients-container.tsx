import { Counter } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';

import { Price } from '../price';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
  title: string;
};

export const BurgerIngredientsContainer = ({
  ingredients,
  title,
}: TBurgerIngredientsProps): React.JSX.Element => {
  return (
    <article className={styles.ingredients}>
      <h2 className={styles.ingredients__title}>{title}</h2>
      <ul className={clsx(styles.ingredients__container, 'pl-1 pr-1')}>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id} className={styles.ingredient}>
            <Counter count={0} size="default" />
            <img className="ml-1 mr-1" src={ingredient.image} alt={ingredient.name} />
            <Price
              price={ingredient.price}
              className="mt-1 mb-1  text_type_digits-default"
            />
            <span className={clsx(styles.name, 'mb-10')}>{ingredient.name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};
