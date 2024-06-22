import styles from './ingredient-details.module.css';
import { ingredientPropType } from '../../utils/types';
import PropTypes from 'prop-types';

const IngredientDetails = ({ ingredient }) => {
  const { image_large, name, calories, proteins, fat, carbohydrates } = ingredient;

  return (
    <div className={styles.ingredient}>
      <img src={image_large} alt={name} />
      <span className={styles.text_main_medium}>
        {name}
      </span>
      <div className={styles.nutrition}>
        <div className={styles.nutrition_item}>
          <span className={styles.text_main_default}>
            Калории, ккал
          </span>
          <span className={styles.text_digits_default}>
            {calories}
          </span>
        </div>
        <div className={styles.nutrition_item}>
          <span className={styles.text_main_default}>
            Белки, г
          </span>
          <span className={styles.text_digits_default}>
            {proteins}
          </span>
        </div>
        <div className={styles.nutrition_item}>
          <span className={styles.text_main_default}>
            Жиры, г
          </span>
          <span className={styles.text_digits_default}>
            {fat}
          </span>
        </div>
        <div className={styles.nutrition_item}>
          <span className={styles.text_main_default}>
            Углеводы, г
          </span>
          <span className={styles.text_digits_default}>
            {carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = { ingredient: ingredientPropType };

export default IngredientDetails;
