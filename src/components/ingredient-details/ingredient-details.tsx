import { clsx } from 'clsx';

import { IngredientNutrition } from '../burger-ingredients/ingredient-nutrition';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-details.module.css';

type TBurgerIngredientsProps = {
  ingredient: TIngredient;
};

export const IngredientDetails = ({
  ingredient,
}: TBurgerIngredientsProps): React.JSX.Element => {
  return (
    <section className={clsx(styles.container, 'text  text_type_main-default')}>
      <h1 className={styles.title}>Детали ингредиента</h1>
      <img
        className={clsx(styles.image, 'mb-2')}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <h2 className="mb-8">{ingredient.name}</h2>
      <ul
        className={clsx(
          styles.nutrition,
          'text text_type_main-default text_color_inactive'
        )}
      >
        <IngredientNutrition title={'Калории,ккал'} numb={ingredient.calories} />
        <IngredientNutrition title={'Белки, г'} numb={ingredient.proteins} />
        <IngredientNutrition title={'Жиры, г'} numb={ingredient.fat} />
        <IngredientNutrition title={'Углеводы, г'} numb={ingredient.carbohydrates} />
      </ul>
    </section>
  );
};
