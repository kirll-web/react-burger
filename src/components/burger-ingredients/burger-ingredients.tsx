import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useGetIngredientsQuery } from '@services/ingredientsApi';

import { BurgerIngredientsContainer } from './burger-ingredients-container';
import { useIngredientsTabs } from './use-ingredients-tabs';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
  const { data: ingredients = [] } = useGetIngredientsQuery();

  const {
    currentTab,
    setCurrentTab,
    bunsContainerRef,
    mainContainerRef,
    sauceContainerRef,
    handleScroll,
  } = useIngredientsTabs();
  const navigate = useNavigate();
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

  const handleClickIngredient = (ingredient: TIngredient): void => {
    void navigate(`/ingredients/${ingredient._id}`);
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
      <Outlet />
    </section>
  );
};
