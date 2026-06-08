import { Outlet } from 'react-router-dom';

import { Feed } from '@components/feed';
import { FeedStats } from '@components/feed-stats';
import { useGetAllFeedsQuery } from '@services/feedsApi';
import { DEFAULT_FEEDS_INFO } from '@utils/consts';

import type { ReactElement } from 'react';

import styles from './feed-page.module.css';

export const FeedPage = (): ReactElement => {
  const { data = DEFAULT_FEEDS_INFO } = useGetAllFeedsQuery();
  return (
    <main className={styles.main}>
      <h1 className={`text text_type_main-large mt-10 mb-5 pl-5`}>Лента заказов</h1>
      <div className={styles.content}>
        <div className={styles.feeds}>
          {data?.orders?.map((order) => (
            <Feed key={order._id} feed={order} />
          ))}
        </div>
        <FeedStats
          orders={data.orders}
          total={data.total}
          todayTotal={data.totalToday}
        />
      </div>
      <Outlet />
    </main>
  );
};
