import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BurgerConstructor } from '@components/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients';
import { useGetIngredientsQuery } from '@services/ingredientsApi';
import { selectConsturctorIngredient } from '@services/slices/constructor-slice';
import { useAppDispatch } from '@services/store';

import type { TIngredient } from '@utils/types';

import styles from './home.module.css';

export const HomePage = (): React.JSX.Element => {
  const { isLoading } = useGetIngredientsQuery();
  const dispatch = useAppDispatch();

  const handleDrop = (item: TIngredient): void => {
    dispatch(selectConsturctorIngredient(item));
  };

  return (
    <>
      <h1 className={clsx('text text_type_main-large mt-10 mb-5 pl-5', styles.title)}>
        Соберите бургер
      </h1>
      <main className={clsx('pl-5 pr-5', styles.main)}>
        <DndProvider backend={HTML5Backend}>
          {isLoading ? (
            <Preloader />
          ) : (
            <>
              <BurgerIngredients />
              <BurgerConstructor onDropHandler={handleDrop} />
            </>
          )}
        </DndProvider>
      </main>
    </>
  );
};
