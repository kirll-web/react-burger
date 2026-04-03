import styles from './ingredient-nutrition.module.css';

export type TIngredientNutritionProps = {
  title: string;
  numb: number;
};

export const IngredientNutrition = ({
  title,
  numb,
}: TIngredientNutritionProps): React.JSX.Element => {
  return (
    <li className={styles.nutrition_item}>
      <span>{title}</span>
      <span>{numb}</span>
    </li>
  );
};
