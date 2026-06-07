import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import { useGetIngredientsQuery } from '@services/ingredientsApi';
import { formatOrderDate, getOrderStatusText, isDoneOrder } from '@utils/orders';

import type { TFeed, TIngredient } from '@utils/types';

import styles from './feed-order-details.module.css';

type FeedOrderDetailsProps = {
  order: TFeed;
};

type ResolvedOrderIngredient = TIngredient & {
  count: number;
};

export const FeedOrderDetails = ({
  order,
}: FeedOrderDetailsProps): React.JSX.Element => {
  const { data: ingredients = [] } = useGetIngredientsQuery();

  const ingredientsMap = new Map(
    ingredients.map((ingredient) => [ingredient._id, ingredient])
  );
  const groupedIngredients = order.ingredients.reduce<ResolvedOrderIngredient[]>(
    (acc, id) => {
      const ingredient = ingredientsMap.get(id);

      if (!ingredient) {
        return acc;
      }

      const existingIngredient = acc.find((item) => item._id === id);

      if (existingIngredient) {
        existingIngredient.count += 1;

        return acc;
      }

      acc.push({ ...ingredient, count: 1 });

      return acc;
    },
    []
  );

  const totalPrice = groupedIngredients.reduce(
    (sum, ingredient) => sum + ingredient.price * ingredient.count,
    0
  );

  return (
    <section className={styles.container}>
      <p className="text text_type_digits-default">#{order.number}</p>
      <h1 className={clsx(styles.title, 'text text_type_main-medium mt-10')}>
        {order.name}
      </h1>
      <p
        className={clsx(
          styles.status,
          'text text_type_main-default mt-3',
          isDoneOrder(order.status) && styles.statusDone
        )}
      >
        {getOrderStatusText(order.status)}
      </p>

      <div className="mt-15">
        <h2 className="text text_type_main-medium">Состав:</h2>
        <ul className={clsx(styles.ingredients, 'custom-scroll mt-6')}>
          {groupedIngredients.map((ingredient) => (
            <li key={ingredient._id} className={styles.ingredient}>
              <div className={styles.ingredientInfo}>
                <div className={styles.ingredientImageWrap}>
                  <img
                    className={styles.ingredientImage}
                    src={ingredient.image_mobile}
                    alt={ingredient.name}
                  />
                </div>
                <p className="text text_type_main-default">{ingredient.name}</p>
              </div>

              <div className={styles.ingredientPrice}>
                <span className="text text_type_digits-default mr-2">
                  {ingredient.count} x {ingredient.price}
                </span>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={clsx(styles.footer, 'mt-10')}>
        <p className="text text_type_main-default text_color_inactive">
          {formatOrderDate(order.createdAt)}
        </p>
        <div className={styles.totalPrice}>
          <span className="text text_type_digits-default mr-2">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
};
