import type { TFeed } from './types';

export const feedOrders: TFeed[] = [
  {
    ingredients: [
      '692889f16bf770001bfeb4cc',
      '692889f16bf770001bfeb4d6',
      '692889f16bf770001bfeb4d6',
      '692889f16bf770001bfeb4d6',
      '692889f16bf770001bfeb4cc',
      '692889f16bf770001bfeb4d6',
      '692889f16bf770001bfeb4d6',
      '692889f16bf770001bfeb4d6',
      '692889f16bf770001bfeb4cc',
      '692889f16bf770001bfeb4d6',
      '692889f16bf770001bfeb4d6',
      '692889f16bf770001bfeb4d6',
    ],
    _id: '1',
    name: 'Black Hole Singularity острый бургер',
    status: 'done',
    number: 34533,
    createdAt: new Date('2021-06-23T13:50:22.587Z'),
    updatedAt: new Date('2021-06-23T13:50:22.603Z'),
  },
  {
    ingredients: [
      '692889f16bf770001bfeb4d6',
      '692889f16bf770001bfeb4d6',
      '692889f16bf770001bfeb4d6',
      '692889f16bf770001bfeb4d6',
    ],
    _id: '2',
    name: 'Space флюоресцентный бургер',
    status: 'pending',
    number: 34538,
    createdAt: new Date('2021-06-23T14:43:22.587Z'),
    updatedAt: new Date('2021-06-23T14:43:22.603Z'),
  },
  {
    ingredients: ['692889f16bf770001bfeb4cc', '692889f16bf770001bfeb4d6'],
    _id: '3',
    name: 'Альфа бургер',
    status: 'done',
    number: 34532,
    createdAt: new Date('2021-06-23T14:43:22.587Z'),
    updatedAt: new Date('2021-06-23T14:43:22.603Z'),
  },
  {
    ingredients: ['692889f16bf770001bfeb4cc', '692889f16bf770001bfeb4d6'],
    _id: '4',
    name: 'Бета бургер',
    status: 'done',
    number: 34530,
    createdAt: new Date('2021-06-23T14:43:22.587Z'),
    updatedAt: new Date('2021-06-23T14:43:22.603Z'),
  },
  {
    ingredients: ['692889f16bf770001bfeb4cc', '692889f16bf770001bfeb4d6'],
    _id: '5',
    name: 'Гамма бургер',
    status: 'done',
    number: 34527,
    createdAt: new Date('2021-06-23T14:43:22.587Z'),
    updatedAt: new Date('2021-06-23T14:43:22.603Z'),
  },
  {
    ingredients: ['692889f16bf770001bfeb4cc', '692889f16bf770001bfeb4d6'],
    _id: '6',
    name: 'Дельта бургер',
    status: 'done',
    number: 34525,
    createdAt: new Date('2021-06-23T14:43:22.587Z'),
    updatedAt: new Date('2021-06-23T14:43:22.603Z'),
  },
  {
    ingredients: ['692889f16bf770001bfeb4cc', '692889f16bf770001bfeb4d6'],
    _id: '7',
    name: 'Сигма бургер',
    status: 'created',
    number: 34541,
    createdAt: new Date('2021-06-23T14:43:22.587Z'),
    updatedAt: new Date('2021-06-23T14:43:22.603Z'),
  },
  {
    ingredients: ['692889f16bf770001bfeb4cc', '692889f16bf770001bfeb4d6'],
    _id: '8',
    name: 'Нова бургер',
    status: 'created',
    number: 34542,
    createdAt: new Date('2021-06-23T14:43:22.587Z'),
    updatedAt: new Date('2021-06-23T14:43:22.603Z'),
  },
];

export const feedOrdersTotal = 28752;

export const feedOrdersTodayTotal = 138;

export const getFeedOrderById = (id?: string): TFeed | undefined =>
  feedOrders.find((order) => order._id === id);

export const getOrderStatusText = (status: string): string =>
  status === 'done' ? 'Выполнен' : 'Готовится';

export const isDoneOrder = (status: string): boolean => status === 'done';

export const formatOrderDate = (createdAt: Date): string => {
  const date = new Date(createdAt);
  const now = new Date();
  const yesterday = new Date(now);

  yesterday.setDate(now.getDate() - 1);

  const time = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (date.toDateString() === now.toDateString()) {
    return `Сегодня, ${time}`;
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return `Вчера, ${time}`;
  }

  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
};
