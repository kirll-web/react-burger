import { clsx } from 'clsx';
import { Outlet } from 'react-router-dom';

import { Feed } from '@components/feed';
import { feedOrders } from '@utils/orders';

import type { ReactElement } from 'react';

import styles from './profile-order-page.module.css';

export const ProfileOrderPage = (): ReactElement => {
  return (
    <section className={styles.content}>
      <div className={clsx(styles.feeds, 'custom-scroll')}>
        {feedOrders.map((order) => (
          <Feed key={order._id} feed={order} linkBase="/profile/orders" showStatus />
        ))}
      </div>
      <Outlet />
    </section>
  );
};
