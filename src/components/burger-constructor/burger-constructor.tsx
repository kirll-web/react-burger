import { Button } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useEffect } from 'react';

import { useModal } from '@hooks/useModal';
import { useOrderMutation } from '@services/ordersApi';

import { Modal } from '../modal';
import { OrderDetails } from '../order-details/order-details';
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
  const { openModal, isModalOpen, closeModal } = useModal();

  const [order, { data, isLoading, error }] = useOrderMutation();

  const handleClick = (): void => {
    if (isLoading) {
      return;
    }
    void order([
      '692889f16bf770001bfeb4cc',
      '692889f16bf770001bfeb4d8',
      '692889f16bf770001bfeb4d7',
      '692889f16bf770001bfeb4cc',
    ]);
  };

  useEffect(() => {
    if (data || error) {
      openModal();
    }
  }, [data, error, openModal]);

  if (ingredients.length === 0) {
    return (
      <section className={clsx(styles.burger_constructor, 'pl-4 pr-4 pt-1')}>
        <div className={'text text_type_main-default text_color_inactive'}>
          Добавьте ингредиенты для вашего бургера
        </div>
      </section>
    );
  }

  const [bun, ...ingredientsWithBunBottom] = ingredients;
  const mainIngredients = ingredientsWithBunBottom.slice(0, -1);

  return (
    <section className={clsx(styles.burger_constructor, 'pl-4 pr-4 pt-1')}>
      <div className={styles.ingredients}>
        <BurgerConstructorIngredientListItem
          className="mr-5"
          ingredient={bun}
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
          ingredient={bun}
          isLocked={true}
          type="bottom"
        />
      </div>
      <footer className={clsx(styles.footer, 'mt-10')}>
        <Price price={50} className="text_type_digits-medium" />
        <Button onClick={handleClick} size="large" type="primary" htmlType={'button'}>
          {isLoading ? 'Оформляем заказ...' : 'Оформить заказ'}
        </Button>
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
