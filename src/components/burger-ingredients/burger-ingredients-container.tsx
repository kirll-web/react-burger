import { Counter } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import { Price } from '../price';

import type { TIngredient } from '@utils/types';
import type { ReactElement, RefObject } from 'react';

import styles from './burger-ingredients-container.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
  title: string;
  ref?: RefObject<HTMLElement | null>;

  onClickIngredient: (ingredient: TIngredient) => void;
};

export const BurgerIngredientsContainer = ({
  ingredients,
  title,
  ref,

  onClickIngredient,
}: TBurgerIngredientsProps): ReactElement => {
  const handleClickIngredient = (ingredient: TIngredient): void => {
    onClickIngredient(ingredient);
  };

  return (
    <article className={styles.ingredients} ref={ref}>
      <h2 className={styles.ingredients__title}>{title}</h2>
      <ul className={clsx(styles.ingredients__container, 'pl-1 pr-1')}>
        {ingredients.map((ingredient) => (
          <li
            key={ingredient._id}
            className={styles.ingredient}
            onClick={(): void => {
              handleClickIngredient(ingredient);
            }}
          >
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
