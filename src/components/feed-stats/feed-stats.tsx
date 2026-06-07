import { clsx } from 'clsx';

import { FeedStatsOrders } from './feed-stats-orders';

import type { TFeed } from '@utils/types';

import styles from './feed-stats.module.css';

type FeedStatsProps = {
  orders: TFeed[];
  todayTotal: number;
  total: number;
};

const DONE_STATUS = 'done';

export const FeedStats = ({
  orders,
  todayTotal,
  total,
}: FeedStatsProps): React.JSX.Element => {
  const doneOrders = orders
    .filter((order) => order.status === DONE_STATUS)
    .map((order) => order.number);
  const pendingOrders = orders
    .filter((order) => order.status !== DONE_STATUS)
    .map((order) => order.number);

  return (
    <aside className={styles.stats}>
      <div className={styles.columns}>
        <FeedStatsOrders numbers={doneOrders} title="Готовы:" variant="done" />
        <FeedStatsOrders numbers={pendingOrders} title="В работе:" />
      </div>

      <section>
        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
        <p className={clsx(styles.total, 'text_type_digits-large')}>{total}</p>
      </section>

      <section>
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <p className={clsx(styles.total, 'text_type_digits-large')}>{todayTotal}</p>
      </section>
    </aside>
  );
};
