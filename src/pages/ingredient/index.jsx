import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from "./ingredient.module.css";

export default function IngredientPage() {
  return (
    <main className={styles.ingredient}>
      <div className={styles.size}>
        <IngredientDetails />
      </div>
    </main>
  );
}
