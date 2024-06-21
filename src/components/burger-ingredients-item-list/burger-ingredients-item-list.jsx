import IngredientItem from '../burger-ingredients-item/burger-ingredients-item';
import styles from './burger-ingredients-item-list.module.css';
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

const IngredientGroup = ({ ingredients, name, type }) => {
  return (
    <section>
      <h2>
        {name}
      </h2>
      <ul className={styles.item_group}>
        {ingredients
          .filter((ingredient) => ingredient.type === type)
          .map((ingredient) => <IngredientItem key={ingredient._id} ingredient={ingredient} counter={1} />)
	}
      </ul>
    </section>
  );
};

IngredientGroup.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType),
  name: PropTypes.string,
  type: PropTypes.string
};

export default IngredientGroup;
