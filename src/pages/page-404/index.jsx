import styles from "./page-404.module.css";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <main className={styles.main}>
      <div className={styles.page404}>
        <p className={styles.sad}>Ошибка 404</p>
        <p className={styles.smile}>&#9785;</p>
        <h1>Такой страницы нет</h1>
        <p>
          <Link className={styles.link} to="/">
            Перейти на главную страницу
          </Link>
        </p>
      </div>
    </main>
  );
}
