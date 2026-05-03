import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

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
      className={`text text_type_main-default ml-2 ${isActive ? styles.link_active : ''}`}
    >
      {text}
    </p>
  </>
);

export const AppHeader = (): React.JSX.Element => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink to="/" className={styles.link}>
            {({ isActive }) => (
              <AppHeaderLink
                icon={<BurgerIcon type={isActive ? 'primary' : 'secondary'} />}
                text="Конструктор"
                isActive={isActive}
              />
            )}
          </NavLink>

          <NavLink to="/feed" className={`${styles.link} ml-10`}>
            {({ isActive }) => (
              <AppHeaderLink
                icon={<ListIcon type={isActive ? 'primary' : 'secondary'} />}
                text="Лента заказов"
                isActive={isActive}
              />
            )}
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavLink to="/profile" className={`${styles.link} ${styles.link_position_last}`}>
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
