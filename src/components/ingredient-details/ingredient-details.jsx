import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types'

const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
});

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

IngredientDetails.propTypes = { ingredients: PropTypes.arrayOf(ingredientPropType) };

export default IngredientDetails;
