import { clsx } from 'clsx';

import { BurgerIngredient } from './burger-ingredient';

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
  return (
    <article className={styles.ingredients} ref={ref}>
      <h2 className={styles.ingredients__title}>{title}</h2>
      <ul className={clsx(styles.ingredients__container, 'pl-1 pr-1')}>
        {ingredients.map((ingredient) => (
          <BurgerIngredient
            key={ingredient._id}
            ingredient={ingredient}
            onClickIngredient={onClickIngredient}
          />
        ))}
      </ul>
    </article>
  );
};
