import {
  setData,
  resetData,
} from "../../services/slices/ingredient-details-slice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { Store } from "../../types";
import { useEffect } from "react";

const IngredientDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: ingredient } = useSelector(
    (store: Store) => store.ingredientDetails,
  );
  const { isLoading, data: ingredients } = useSelector(
    (store: Store) => store.burgerIngredients,
  );

  useEffect(() => {
    return () => {
      dispatch(resetData());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!ingredient && ingredients) {
      dispatch(
        setData(ingredients.find((ingredient) => ingredient._id === id)),
      );
    }
  }, [ingredients, id, dispatch, ingredient]);

  return (
    <div className={styles.ingredient}>
      <GridLoader
        color="#8585ad"
        loading={isLoading}
        cssOverride={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate('-50%', '-50%')",
        }}
      />
      {ingredient && (
        <>
          <h2>Детали ингредиента</h2>
          <img src={ingredient.image_large} alt={ingredient.name} />
          <span className={styles.text_main_medium}>{ingredient.name}</span>
          <div className={styles.nutrition}>
            <div className={styles.nutrition_item}>
              <span className={styles.text_main_default}>Калории, ккал</span>
              <span className={styles.text_digits_default}>
                {ingredient.calories}
              </span>
            </div>
            <div className={styles.nutrition_item}>
              <span className={styles.text_main_default}>Белки, г</span>
              <span className={styles.text_digits_default}>
                {ingredient.proteins}
              </span>
            </div>
            <div className={styles.nutrition_item}>
              <span className={styles.text_main_default}>Жиры, г</span>
              <span className={styles.text_digits_default}>
                {ingredient.fat}
              </span>
            </div>
            <div className={styles.nutrition_item}>
              <span className={styles.text_main_default}>Углеводы, г</span>
              <span className={styles.text_digits_default}>
                {ingredient.carbohydrates}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IngredientDetails;
