import { clsx } from 'clsx';

import styles from './feed-stats.module.css';

type FeedStatsOrdersProps = {
  numbers: number[];
  title: string;
  variant?: 'default' | 'done';
};

export const FeedStatsOrders = ({
  numbers,
  title,
  variant = 'default',
}: FeedStatsOrdersProps): React.JSX.Element => (
  <section>
    <h2 className="text text_type_main-medium mb-6">{title}</h2>
    <ul className={styles.orderList}>
      {numbers.map((number) => (
        <li
          key={number}
          className={clsx(
            'text text_type_digits-default',
            variant === 'done' && styles.doneNumber
          )}
        >
          {number}
        </li>
      ))}
    </ul>
  </section>
);
