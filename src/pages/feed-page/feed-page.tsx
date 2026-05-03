import type { ReactElement } from 'react';

import styles from './feed-page.module.css';

export const FeedPage = (): ReactElement => {
  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <p className="text text_type_main-default mt-6">
        Страница находится в разработке. Функциональность появится в следующих спринтах.
      </p>
    </main>
  );
};
