import type { PropsWithChildren } from 'react';

export type DefaultPropsWithoutChildren = {
  className?: string;
};

export type DefaultPropsWithChildren = PropsWithChildren<DefaultPropsWithoutChildren>;

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

export type TFeed = {
  ingredients: string[];
  _id: string;
  name: string;
  status: string;
  number: number;
  createdAt: Date;
  updatedAt: Date;
};
