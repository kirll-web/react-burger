import {
  clearConstructor,
  constructorReducer,
  constructorSlice,
  getConstructorBun,
  getConstructorIngredients,
  getPrice,
  makeGetIngredientCounter,
  moveConsturctorIngredient,
  selectConsturctorIngredient,
  unselectConsturctorIngredient,
} from './constructor-slice';

import type { RootState } from '@services/store';
import type { TIngredient } from '@utils/types';

describe('constructorSlice', () => {
  const bun: TIngredient = {
    _id: 'bun-id',
    name: 'Test Bun',
    type: 'bun',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 4,
    price: 100,
    image: 'bun.png',
    image_large: 'bun-large.png',
    image_mobile: 'bun-mobile.png',
    __v: 0,
  };

  const main: TIngredient = {
    _id: 'main-id',
    name: 'Test Main',
    type: 'main',
    proteins: 5,
    fat: 6,
    carbohydrates: 7,
    calories: 8,
    price: 200,
    image: 'main.png',
    image_large: 'main-large.png',
    image_mobile: 'main-mobile.png',
    __v: 0,
  };

  const sauce: TIngredient = {
    _id: 'sauce-id',
    name: 'Test Sauce',
    type: 'sauce',
    proteins: 9,
    fat: 10,
    carbohydrates: 11,
    calories: 12,
    price: 50,
    image: 'sauce.png',
    image_large: 'sauce-large.png',
    image_mobile: 'sauce-mobile.png',
    __v: 0,
  };

  it('should return initial state', () => {
    const state = constructorReducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      bun: undefined,
      ingredients: [],
      nextIndex: 1,
    });
  });

  it('should handle selectIngredient for bun', () => {
    const state = constructorReducer(undefined, selectConsturctorIngredient(bun));

    expect(state).toEqual({
      bun,
      ingredients: [],
      nextIndex: 1,
    });
    expect(state.bun).not.toBe(bun);
  });

  it('should handle selectIngredient for non-bun ingredients', () => {
    const state = constructorReducer(undefined, selectConsturctorIngredient(main));

    expect(state).toEqual({
      bun: undefined,
      ingredients: [{ index: 1, ingredient: main }],
      nextIndex: 2,
    });
    expect(state.ingredients[0]?.ingredient).not.toBe(main);
  });

  it('should handle clearConstructor', () => {
    const state = constructorReducer(
      {
        bun,
        ingredients: [
          { index: 1, ingredient: main },
          { index: 2, ingredient: sauce },
        ],
        nextIndex: 3,
      },
      clearConstructor()
    );

    expect(state).toEqual({
      bun: undefined,
      ingredients: [],
      nextIndex: 1,
    });
  });

  it('should handle unselectIngredient', () => {
    const state = constructorReducer(
      {
        bun,
        ingredients: [
          { index: 1, ingredient: main },
          { index: 2, ingredient: sauce },
        ],
        nextIndex: 3,
      },
      unselectConsturctorIngredient({ index: 1, ingredient: main })
    );

    expect(state.ingredients).toEqual([{ index: 2, ingredient: sauce }]);
    expect(state.nextIndex).toBe(3);
  });

  it('should handle moveIngredient', () => {
    const state = constructorReducer(
      {
        bun,
        ingredients: [
          { index: 1, ingredient: main },
          { index: 2, ingredient: sauce },
        ],
        nextIndex: 3,
      },
      moveConsturctorIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.ingredients).toEqual([
      { index: 2, ingredient: sauce },
      { index: 1, ingredient: main },
    ]);
  });

  it('should not moveIngredient when indexes are invalid', () => {
    const initialState = {
      bun,
      ingredients: [
        { index: 1, ingredient: main },
        { index: 2, ingredient: sauce },
      ],
      nextIndex: 3,
    };

    const state = constructorReducer(
      initialState,
      moveConsturctorIngredient({ fromIndex: -1, toIndex: 1 })
    );

    expect(state).toEqual(initialState);
  });

  it('should select constructor state values', () => {
    const rootState = {
      [constructorSlice.name]: {
        bun,
        ingredients: [{ index: 1, ingredient: main }],
        nextIndex: 2,
      },
    } as RootState;

    expect(getConstructorBun(rootState)).toEqual(bun);
    expect(getConstructorIngredients(rootState)).toEqual([
      { index: 1, ingredient: main },
    ]);
    expect(getPrice(rootState)).toBe(400);
  });

  it('should count selected ingredients', () => {
    const getIngredientCounter = makeGetIngredientCounter();
    const rootState = {
      constructorSlice: {
        bun,
        ingredients: [
          { index: 1, ingredient: main },
          { index: 2, ingredient: main },
          { index: 3, ingredient: sauce },
        ],
        nextIndex: 4,
      },
    } as RootState;

    expect(getIngredientCounter(rootState, bun)).toBe(2);
    expect(getIngredientCounter(rootState, main)).toBe(2);
    expect(getIngredientCounter(rootState, sauce)).toBe(1);
  });
});
