import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useMemo, useState } from 'react';

import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal';
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
  const [selectedIngredient, setSelectedIngredient] = useState<TIngredient | undefined>(
    undefined
  );
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
    setSelectedIngredient(undefined);
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
      <div className={clsx(styles.menu, 'mb-10 custom-scroll')}>
        <BurgerIngredientsContainer
          ingredients={buns}
          title={'Булки'}
          onClickIngredient={setSelectedIngredient}
        />
        <BurgerIngredientsContainer
          ingredients={mains}
          title={'Начинка'}
          onClickIngredient={setSelectedIngredient}
        />
        <BurgerIngredientsContainer
          ingredients={sauces}
          title={'Соусы'}
          onClickIngredient={setSelectedIngredient}
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
