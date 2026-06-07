import { Feed } from '@components/feed';
import { FeedStats } from '@components/feed-stats';

import type { TFeed } from '@utils/types';
import type { ReactElement } from 'react';

import styles from './feed-page.module.css';

const orders: TFeed[] = [
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
    name: 'Interstellar бургер',
    status: 'done',
    number: 34533,
    createdAt: new Date('2021-06-23T14:43:22.587Z'),
    updatedAt: new Date('2021-06-23T14:43:22.603Z'),
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

export const FeedPage = (): ReactElement => {
  return (
    <main className={styles.main}>
      <h1 className={`text text_type_main-large mt-10 mb-5 pl-5`}>Лента заказов</h1>
      <div className={styles.content}>
        <div className={styles.feeds}>
          {orders.map((order) => (
            <Feed key={order._id} feed={order} />
          ))}
        </div>
        <FeedStats orders={orders} total={28752} todayTotal={138} />
      </div>
    </main>
  );
};
