import { Tab } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';
import { useMemo, useState } from 'react';

import { BurgerIngredientsContainer } from './burger-ingredients-container';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const [currentTab, setCurrentTab] = useState('bun');
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
      {/* Список всяких ингредиентов */}
      <div className={clsx(styles.menu, 'mb-10 custom-scroll')}>
        <BurgerIngredientsContainer ingredients={buns} title={'Булки'} />
        <BurgerIngredientsContainer ingredients={mains} title={'Начинка'} />
        <BurgerIngredientsContainer ingredients={sauces} title={'Соусы'} />
      </div>
    </section>
  );
};
