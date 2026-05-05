import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import {
  unselectConsturctorIngredient,
  type TConstuctorIngredient,
} from '@services/slices/constructor-slice';
import { useAppDispatch } from '@services/store';

import type { DefaultPropsWithoutChildren, TIngredient } from '@utils/types';

import styles from './burger-constructor-ingredient-list-item.module.css';

type TIngredientListItem = TConstuctorIngredient | TIngredient;

type TBurgerConstructorIngredientProps = DefaultPropsWithoutChildren & {
  ingredient: TIngredientListItem;
  isLocked: boolean;
  type?: 'top' | 'bottom';
  position?: number;
  onMove?: (fromIndex: number, toIndex: number) => void;
};

type TDraggedConstructorIngredient = {
  position: number;
};

const isConstuctorIngredient = (
  item: TIngredientListItem
): item is TConstuctorIngredient => {
  return typeof item === 'object' && item !== null && 'ingredient' in item;
};

const getName = (name: string, type?: 'top' | 'bottom'): string => {
  switch (type) {
    case 'top':
      return `${name} (верх)`;
    case 'bottom':
      return `${name} (низ)`;
    default:
      return name;
  }
};

export const BurgerConstructorIngredientListItem = ({
  className,
  ingredient,
  isLocked,
  type,
  position,
  onMove,
}: TBurgerConstructorIngredientProps): React.JSX.Element => {
  const ingredientRef = useRef<HTMLLIElement | null>(null);
  const selectedIngredient = isConstuctorIngredient(ingredient)
    ? ingredient.ingredient
    : ingredient;
  const name = getName(selectedIngredient.name, type);
  const dispatch = useAppDispatch();
  const canSort =
    !isLocked &&
    isConstuctorIngredient(ingredient) &&
    position !== undefined &&
    !!onMove;

  const [{ isDragging }, drag] = useDrag({
    type: 'constructor-ingredient',
    item: { position: position ?? 0 },
    canDrag: canSort,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop<TDraggedConstructorIngredient>({
    accept: 'constructor-ingredient',
    hover(item, monitor) {
      if (!canSort || position === undefined || !onMove || !ingredientRef.current) {
        return;
      }

      const fromIndex = item.position;
      const toIndex = position;

      if (fromIndex === toIndex) {
        return;
      }

      const hoverRect = ingredientRef.current.getBoundingClientRect();
      const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) {
        return;
      }

      const hoverClientY = clientOffset.y - hoverRect.top;

      if (fromIndex < toIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (fromIndex > toIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMove(fromIndex, toIndex);
      item.position = toIndex;
    },
  });

  if (canSort) {
    drag(drop(ingredientRef));
  }

  const handleRemove = (): void => {
    if (isLocked) {
      return;
    }

    if (isConstuctorIngredient(ingredient)) {
      dispatch(unselectConsturctorIngredient(ingredient));
    }
  };

  return (
    <li
      className={clsx(styles.wrapper, className, {
        [styles.dragging]: isDragging,
      })}
      ref={ingredientRef}
    >
      {!isLocked && <DragIcon type="primary" className={styles.drag} />}
      <ConstructorElement
        isLocked={isLocked}
        type={type}
        text={name}
        thumbnail={selectedIngredient.image}
        price={selectedIngredient.price}
        extraClass={clsx({
          ['ml-8']: isLocked,
        })}
        handleClose={handleRemove}
      />
    </li>
  );
};
