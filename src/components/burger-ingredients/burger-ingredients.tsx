import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getSelectedIngredient,
  selectIngredient,
  unselectIngredient,
} from '@services/slices/ingredient-modal-slice';

import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal';
import { BurgerIngredientsContainer } from './burger-ingredients-container';
import { useIngredientsTabs } from './use-ingredients-tabs';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const dispatch = useDispatch();
  const selectedIngredient = useSelector(getSelectedIngredient);
  const {
    currentTab,
    setCurrentTab,
    bunsContainerRef,
    mainContainerRef,
    sauceContainerRef,
    handleScroll,
  } = useIngredientsTabs();

  const buns = useMemo(
    () => ingredients.filter((item) => item.type === 'bun'),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((item) => item.type === 'main'),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((item) => item.type === 'sauce'),
    [ingredients]
  );

  const handleCloseModal = (): void => {
    dispatch(unselectIngredient());
  };

  const handleClickIngredient = (ingredient: TIngredient): void => {
    dispatch(selectIngredient(ingredient));
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.nav}>
          <Tab
            value="bun"
            active={currentTab === 'bun'}
            onClick={() => {
              setCurrentTab('bun');
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={currentTab === 'main'}
            onClick={() => {
              setCurrentTab('main');
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={currentTab === 'sauce'}
            onClick={() => {
              setCurrentTab('sauce');
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <div className={clsx(styles.menu, 'mb-10 custom-scroll')} onScroll={handleScroll}>
        <BurgerIngredientsContainer
          ingredients={buns}
          title={'Булки'}
          ref={bunsContainerRef}
          onClickIngredient={handleClickIngredient}
        />
        <BurgerIngredientsContainer
          ingredients={mains}
          title={'Начинка'}
          ref={mainContainerRef}
          onClickIngredient={handleClickIngredient}
        />
        <BurgerIngredientsContainer
          ingredients={sauces}
          title={'Соусы'}
          ref={sauceContainerRef}
          onClickIngredient={handleClickIngredient}
        />
      </div>
      {selectedIngredient && (
        <Modal onClose={handleCloseModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
};
