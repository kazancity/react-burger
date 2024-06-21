import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderItem from '../app-header-item/app-header-item';
import styles from './app-header.module.css';

const AppHeader = _ => {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>
        <Logo />
      </span>
      <>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <AppHeaderItem iconMenu='burger' textMenu='Конструктор' isActive />
            <AppHeaderItem iconMenu='list' textMenu='Лента заказов' />
            <AppHeaderItem iconMenu='profile' textMenu='Личный кабинет' />
          </ul>
        </nav>
      </>
    </header>
  );
};

export default AppHeader;
