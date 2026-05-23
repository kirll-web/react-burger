import { Counter } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useMemo, type ReactElement } from 'react';
import { useDrag } from 'react-dnd';

import { makeGetIngredientCounter } from '@services/slices/constructor-slice';
import { useAppSelector } from '@services/store';

import { Price } from '../price';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredient.module.css';

type TBurgerIngredientProps = {
  ingredient: TIngredient;

  onClickIngredient: (ingredient: TIngredient) => void;
};

export const BurgerIngredient = ({
  ingredient,
  onClickIngredient,
}: TBurgerIngredientProps): ReactElement => {
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  const getIngredientCounter = useMemo(makeGetIngredientCounter, []);
  const counter = useAppSelector((state) => getIngredientCounter(state, ingredient));

  return (
    <li
      key={ingredient._id}
      className={styles.ingredient}
      onClick={(): void => {
        onClickIngredient(ingredient);
      }}
      ref={(element) => {
        void dragRef(element);
      }}
    >
      <Counter count={counter} size="default" />
      <img className="ml-1 mr-1" src={ingredient.image} alt={ingredient.name} />
      <Price price={ingredient.price} className="mt-1 mb-1  text_type_digits-default" />
      <span className={clsx(styles.name, 'mb-10')}>{ingredient.name}</span>
    </li>
  );
};
