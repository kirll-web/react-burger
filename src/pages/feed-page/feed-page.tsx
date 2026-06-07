import { Outlet } from 'react-router-dom';

import { Feed } from '@components/feed';
import { FeedStats } from '@components/feed-stats';
import { feedOrders, feedOrdersTodayTotal, feedOrdersTotal } from '@utils/orders';

import type { ReactElement } from 'react';

import styles from './feed-page.module.css';

export const FeedPage = (): ReactElement => {
  return (
    <main className={styles.main}>
      <h1 className={`text text_type_main-large mt-10 mb-5 pl-5`}>Лента заказов</h1>
      <div className={styles.content}>
        <div className={styles.feeds}>
          {feedOrders.map((order) => (
            <Feed key={order._id} feed={order} />
          ))}
        </div>
        <FeedStats
          orders={feedOrders}
          total={feedOrdersTotal}
          todayTotal={feedOrdersTodayTotal}
        />
      </div>
      <Outlet />
    </main>
  );
};
