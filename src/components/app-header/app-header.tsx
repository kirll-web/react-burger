import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { NavLink } from 'react-router-dom';

import { RoutePath } from '@components/app/router';

import type { ReactNode } from 'react';

import styles from './app-header.module.css';

type AppHeaderLinkProps = {
  icon: ReactNode;
  text: string;
  isActive: boolean;
};

const AppHeaderLink = ({ icon, text, isActive }: AppHeaderLinkProps) => (
  <>
    {icon}
    <p
      className={clsx(
        'text text_type_main-default ml-2',
        isActive ? styles.link_active : ''
      )}
    >
      {text}
    </p>
  </>
);

export const AppHeader = (): React.JSX.Element => {
  return (
    <header className={styles.header}>
      <nav className={clsx('p-4', styles.menu)}>
        <div className={styles.menu_part_left}>
          <NavLink to={RoutePath.Home} className={styles.link}>
            {({ isActive }) => (
              <AppHeaderLink
                icon={<BurgerIcon type={isActive ? 'primary' : 'secondary'} />}
                text="Конструктор"
                isActive={isActive}
              />
            )}
          </NavLink>
          <NavLink to={RoutePath.Feed} className={clsx('ml-10', styles.link)}>
            {({ isActive }) => (
              <AppHeaderLink
                icon={<ListIcon type={isActive ? 'primary' : 'secondary'} />}
                text="Лента заказов"
                isActive={isActive}
              />
            )}
          </NavLink>
        </div>
        <NavLink to={RoutePath.Home}>
          <div className={styles.logo}>
            <Logo />
          </div>
        </NavLink>
        <NavLink
          to={RoutePath.Profile}
          className={clsx(styles.link_position_last, styles.link)}
        >
          {({ isActive }) => (
            <AppHeaderLink
              icon={<ProfileIcon type={isActive ? 'primary' : 'secondary'} />}
              text="Личный кабинет"
              isActive={isActive}
            />
          )}
        </NavLink>
      </nav>
    </header>
  );
};
