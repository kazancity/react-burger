import styles from './burger-constructor-item-list.module.css';
import ConstructorItem from '../burger-constructor-item/burger-constructor-item';
import { ingredientPropType } from '../../utils/types';
import PropTypes from 'prop-types'

const ConstructorList = ({ ingredients }) => {

  return (
    <section className={styles.item_section}>
      <ConstructorItem key={`${ingredients[0]._id}`} ingredient={ingredients[0]} type='top' extraClass={styles.item_lock} />
      <ul className={styles.item_list}>
        {ingredients
          .filter((ingredient) => ingredient.type === 'main')
          .map((ingredient) => <li><ConstructorItem key={ingredient._id} ingredient={ingredient} /></li>)
	}
      </ul>
      <ConstructorItem key={`${ingredients[0]._id}+1`} ingredient={ingredients[0]} type='bottom' extraClass={styles.item_lock} />
    </section>
  );
};

ConstructorList.propTypes = { ingredients: PropTypes.arrayOf(ingredientPropType) };

export default ConstructorList;
