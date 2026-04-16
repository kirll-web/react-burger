import { Button } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { useModal } from '@hooks/useModal';
import { useOrderMutation } from '@services/ordersApi';

import {
  getConstructorBun,
  getConstructorIngredients,
  getPrice,
  moveConsturctorIngredient,
} from '../../services/slices/constructor-slice';
import { Modal } from '../modal';
import { OrderDetails } from '../order-details/order-details';
import { Price } from '../price';
import { BurgerConstructorBunWrapper } from './burger-constructor-bun-wrapper';
import { BurgerConstructorIngredientListItem } from './burger-constructor-ingredient-list-item';
import { BurgerConstructorPlaceholder } from './burger-constructor-placeholder';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  onDropHandler: (item: TIngredient) => void;
};

export const BurgerConstructor = ({
  onDropHandler,
}: TBurgerConstructorProps): React.JSX.Element => {
  const dispatch = useDispatch();
  const ingredients = useSelector(getConstructorIngredients);
  const bun = useSelector(getConstructorBun);

  const { openModal, isModalOpen, closeModal } = useModal();

  const [order, { data, isLoading, error }] = useOrderMutation();

  const handleClick = (): void => {
    if (isLoading) {
      return;
    }

    if (!bun || ingredients.length === 0) {
      return;
    }

    void order([
      bun._id,
      ...ingredients.map((ingredient) => ingredient.ingredient._id),
      bun._id,
    ]);
  };

  useEffect(() => {
    if (data || error) {
      openModal();
    }
  }, [data, error, openModal]);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredient) {
      onDropHandler(item);
    },
  });

  const price = useSelector(getPrice);

  const handleMoveIngredient = (fromIndex: number, toIndex: number): void => {
    dispatch(moveConsturctorIngredient({ fromIndex, toIndex }));
  };

  return (
    <section className={clsx(styles.burger_constructor, 'pl-4 pr-4 pt-1')}>
      <div
        className={styles.ingredients}
        ref={(element) => {
          void dropTarget(element);
        }}
      >
        <BurgerConstructorBunWrapper bun={bun}>
          {ingredients.length === 0 ? (
            <BurgerConstructorPlaceholder
              text={'Перетащи сюда ингредиенты, чтобы собрать бургер!'}
            />
          ) : (
            <ul className={clsx(styles.ingredients_main, 'custom-scroll')}>
              {ingredients.map((ingredient, position) => (
                <BurgerConstructorIngredientListItem
                  key={ingredient.index}
                  className="mr-5"
                  ingredient={ingredient}
                  isLocked={false}
                  position={position}
                  onMove={handleMoveIngredient}
                />
              ))}
            </ul>
          )}
        </BurgerConstructorBunWrapper>
      </div>
      <footer className={clsx(styles.footer, 'mt-10')}>
        <Price price={price} className="text_type_digits-medium" />
        {Boolean(bun) && ingredients.length > 0 && (
          <Button onClick={handleClick} size="large" type="primary" htmlType={'button'}>
            {isLoading ? 'Оформляем заказ...' : 'Оформить заказ'}
          </Button>
        )}
      </footer>
      {isModalOpen && !isLoading && (
        <Modal onClose={closeModal}>
          {data?.success ? (
            <OrderDetails orderNumber={data.order.number} />
          ) : (
            <h3
              className={clsx(
                styles.error,
                'text text_type_main-medium text_color_error pr-10 pl-10'
              )}
            >
              Технические инопланетные шоколадки напали! Прячьтесь под стол, а мы уже
              разбираемся в чем дело
            </h3>
          )}
        </Modal>
      )}
    </section>
  );
};
