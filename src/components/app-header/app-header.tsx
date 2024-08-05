import {
  Logo,
  ListIcon,
  BurgerIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Store } from "../../types";

const AppHeader = () => {
  const { user } = useSelector((store: Store) => store.user);

  return (
    <header className={styles.header}>
      <span className={styles.logo}>
        <NavLink to="/">
          <Logo />
        </NavLink>
      </span>
      <nav>
        <ul className={styles.list}>
          <li className={styles.last_item}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${styles.link}`
                  : `${styles.link} ${styles.inactive}`
              }
            >
              {({ isActive }) => (
                <>
                  <BurgerIcon type={isActive ? "primary" : "secondary"} />
                  {"Конструктор"}
                </>
              )}
            </NavLink>
          </li>
          <li className={styles.last_item}>
            <NavLink
              to="/list"
              className={({ isActive }) =>
                isActive
                  ? `${styles.link}`
                  : `${styles.link} ${styles.inactive}`
              }
            >
              {({ isActive }) => (
                <>
                  <ListIcon type={isActive ? "primary" : "secondary"} />
                  {"Лента заказов"}
                </>
              )}
            </NavLink>
          </li>
          <li className={styles.last_item}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? `${styles.link}`
                  : `${styles.link} ${styles.inactive}`
              }
            >
              {({ isActive }) => (
                <>
                  <ProfileIcon type={isActive ? "primary" : "secondary"} />
                  {user ? user.name : "Личный кабинет"}
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
