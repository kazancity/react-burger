import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { getIngredients } from "../../services/slices/burger-ingredients-slice";
import styles from "./ingredient.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function IngredientPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <main className={styles.ingredient}>
      <div className={styles.size}>
        <IngredientDetails />
      </div>
    </main>
  );
}
