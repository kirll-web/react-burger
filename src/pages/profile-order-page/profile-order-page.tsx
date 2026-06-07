import { clsx } from 'clsx';
import { Outlet } from 'react-router-dom';

import { Feed } from '@components/feed';
import { useGetFeedsByTokenQuery } from '@services/feedsApi';
import { DEFAULT_FEEDS_INFO } from '@utils/consts';

import type { ReactElement } from 'react';

import styles from './profile-order-page.module.css';

export const ProfileOrderPage = (): ReactElement => {
  const { data = DEFAULT_FEEDS_INFO } = useGetFeedsByTokenQuery();

  return (
    <section className={styles.content}>
      <div className={clsx(styles.feeds, 'custom-scroll')}>
        {data.orders.map((order) => (
          <Feed key={order._id} feed={order} linkBase="/profile/orders" showStatus />
        ))}
      </div>
      <Outlet />
    </section>
  );
};
