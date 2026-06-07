import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

import { RoutePath } from '@components/app/router';
import { useGetIngredientsQuery } from '@services/ingredientsApi';
import { formatOrderDate } from '@utils/orders';

import type { TFeed, TIngredient } from '@utils/types';

import styles from './feed.module.css';

export type TFeedProps = {
  feed: TFeed;
};

const MAX_VISIBLE_INGREDIENTS = 6;

export const Feed = ({ feed }: TFeedProps): React.ReactElement => {
  const navigate = useNavigate();
  const { data: ingredients = [] } = useGetIngredientsQuery();

  const orderIngredients = feed.ingredients
    .map((ingredientId) =>
      ingredients.find((ingredient) => ingredient._id === ingredientId)
    )
    .filter((ingredient): ingredient is TIngredient => ingredient !== undefined);

  const totalPrice = orderIngredients.reduce(
    (sum, ingredient) => sum + ingredient.price,
    0
  );
  const visibleIngredients = orderIngredients.slice(0, MAX_VISIBLE_INGREDIENTS);
  const hiddenIngredientsCount = orderIngredients.length - MAX_VISIBLE_INGREDIENTS;

  return (
    <article
      className={clsx(styles.feed, 'p-6')}
      onClick={(): void => {
        void navigate(`${RoutePath.Feed}/${feed._id}`);
      }}
    >
      <div className={styles.header}>
        <p className={`text text_type_digits-default`}>#{feed.number}</p>
        <p className={`text text_type_main-default text_color_inactive`}>
          {formatOrderDate(feed.createdAt)}
        </p>
      </div>

      <h2 className={clsx(styles.title, 'text text_type_main-medium mt-6')}>
        {feed.name}
      </h2>

      <div className={clsx(styles.footer, 'mt-6')}>
        <ul className={styles.ingredients}>
          {visibleIngredients.map((ingredient, index) => {
            const isLastVisible = index === MAX_VISIBLE_INGREDIENTS - 1;
            const shouldShowCounter = hiddenIngredientsCount > 0 && isLastVisible;

            return (
              <li
                key={`${feed._id}-${ingredient._id}-${index}`}
                className={styles.ingredient}
                style={{ zIndex: visibleIngredients.length - index }}
              >
                <img
                  className={styles.ingredientImage}
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                />
                {shouldShowCounter ? (
                  <span
                    className={clsx(
                      styles.ingredientCounter,
                      'text text_type_main-default'
                    )}
                  >
                    +{hiddenIngredientsCount}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className={styles.price}>
          <span className="text text_type_digits-default mr-2">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </article>
  );
};
