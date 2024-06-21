import { useEffect, useState } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';

function App() {
  const domain = 'https://norma.nomoreparties.space/api';
  const [ingredients, setIngredients] = useState({ data: null, isError: false, isLoading: true });

  useEffect(_ => {
    const getIngredients = _ => {
      fetch(`${domain}/ingredients`)
        .then((domainRes) => domainRes.json())
        .then((domainRes) => domainRes.success && setIngredients({ ...ingredients, isLoading: false, data: domainRes.data }))
        .catch(_ => setIngredients({ ...ingredients, isLoading: false, isError: true }));
    };
    getIngredients();
    }, 
    []
  );

  return (
    <div className={styles.app}>
      {ingredients.isError &&
        <>
          Упс, произошла ошибка..
        </>
      }
      {ingredients.isLoading &&
        <>
          Загружаем приложение, один момент!
        </>
      }
      {ingredients.data && (
        <>
          <AppHeader />
          <main className={styles.main}>
            <BurgerIngredients ingredients={ingredients.data} />
            <BurgerConstructor ingredients={ingredients.data} />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
