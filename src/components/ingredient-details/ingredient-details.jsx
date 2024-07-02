import { resetData } from "../../services/slices/ingredient-details-slice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ingredient-details.module.css";
import { useEffect } from "react";

const IngredientDetails = () => {
  const { name, image_large, calories, proteins, fat, carbohydrates } =
    useSelector((store) => store.ingredientDetails.data);

  const dispatch = useDispatch();
  useEffect(() => () => dispatch(resetData()), []);

  return (
    <div className={styles.ingredient}>
      {name && (
        <>
          <img src={image_large} alt={name} />
          <span className={styles.text_main_medium}>{name}</span>
          <div className={styles.nutrition}>
            <div className={styles.nutrition_item}>
              <span className={styles.text_main_default}>Калории, ккал</span>
              <span className={styles.text_digits_default}>{calories}</span>
            </div>
            <div className={styles.nutrition_item}>
              <span className={styles.text_main_default}>Белки, г</span>
              <span className={styles.text_digits_default}>{proteins}</span>
            </div>
            <div className={styles.nutrition_item}>
              <span className={styles.text_main_default}>Жиры, г</span>
              <span className={styles.text_digits_default}>{fat}</span>
            </div>
            <div className={styles.nutrition_item}>
              <span className={styles.text_main_default}>Углеводы, г</span>
              <span className={styles.text_digits_default}>
                {carbohydrates}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IngredientDetails;
