import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients';
import { useGetIngredientsQuery } from '@services/ingredientsApi';
import { selectConsturctorIngredient } from '@services/slices/constructor-slice';

import type { TIngredient } from '@utils/types';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const { data: ingredients = [], isLoading } = useGetIngredientsQuery();
  const dispatch = useDispatch();

  const handleDrop = (item: TIngredient): void => {
    dispatch(selectConsturctorIngredient(item));
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <DndProvider backend={HTML5Backend}>
          {isLoading ? (
            <Preloader />
          ) : (
            <>
              <BurgerIngredients ingredients={ingredients} />
              <BurgerConstructor onDropHandler={handleDrop} />
            </>
          )}
        </DndProvider>
      </main>
    </div>
  );
};

export default App;
