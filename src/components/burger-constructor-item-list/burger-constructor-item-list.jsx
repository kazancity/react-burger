import styles from './burger-constructor-item-list.module.css';
import ConstructorItem from '../burger-constructor-item/burger-constructor-item';
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

const ConstructorList = ({ ingredients }) => {
  return (
    <section className={styles.item_section}>
      <ConstructorItem key={`${ingredients[0]._id}-1`} ingredient={ingredients[0]} type='top' extraClass={styles.item_lock} />
      <ul className={styles.item_list}>
        <li><ConstructorItem key={ingredients[8]._id} ingredient={ingredients[8]} /></li>
        <li><ConstructorItem key={ingredients[5]._id} ingredient={ingredients[5]} /></li>
        <li><ConstructorItem key={ingredients[11]._id} ingredient={ingredients[11]} /></li>
        <li><ConstructorItem key={ingredients[10]._id} ingredient={ingredients[10]} /></li>
        <li><ConstructorItem key={ingredients[10]._id} ingredient={ingredients[10]} /></li>
        <li><ConstructorItem key={ingredients[9]._id} ingredient={ingredients[9]} /></li>
        <li><ConstructorItem key={ingredients[6]._id} ingredient={ingredients[6]} /></li>
      </ul>
      <ConstructorItem key={`${ingredients[0]._id}-2`} ingredient={ingredients[0]} type='bottom' extraClass={styles.item_lock} />
    </section>
  );
};

ConstructorList.propTypes = { ingredients: PropTypes.arrayOf(ingredientPropType) };

export default ConstructorList;
