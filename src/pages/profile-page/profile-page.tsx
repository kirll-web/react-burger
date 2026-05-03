import { clsx } from 'clsx';
import { NavLink, Outlet } from 'react-router-dom';

import { useLogout } from '@hooks/use-logout';

import type { ReactElement } from 'react';

import styles from './profile-page.module.css';

export const ProfilePage = (): ReactElement => {
  const { handleLogout } = useLogout();

  return (
    <main className={styles.main}>
      <section className={styles.layout}>
        <nav className={styles.navigation}>
          <ul className={styles.links}>
            <li>
              <NavLink to="/profile" end className={styles.link}>
                {({ isActive }) => (
                  <span
                    className={clsx(
                      'text text_type_main-medium',
                      !isActive ? 'text_color_inactive' : 'text_color_primary'
                    )}
                  >
                    Профиль
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile/orders" className={styles.link}>
                {({ isActive }) => (
                  <span
                    className={clsx(
                      'text text_type_main-medium',
                      !isActive ? 'text_color_inactive' : 'text_color_primary'
                    )}
                  >
                    История заказов
                  </span>
                )}
              </NavLink>
            </li>
            <li
              className={clsx('text text_type_main-medium text_color_inactive')}
              onClick={handleLogout}
            >
              Выход
            </li>
          </ul>
          <p className={styles.note}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </nav>
        <section className={styles.content}>
          <Outlet />
        </section>
      </section>
    </main>
  );
};
