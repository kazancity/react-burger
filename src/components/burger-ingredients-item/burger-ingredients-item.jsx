import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import useModalControl from '../../hooks/use-modal-control';
import styles from './burger-ingredients-item.module.css';
import { ingredientPropType } from '../../utils/types';
import Modal from '../modal/modal';
import PropTypes from 'prop-types'

const IngredientItem = ({ ingredient, counter = null }) => {
  const { isShowModal, openModWin, closeModWin } = useModalControl(false);
  const { name, image, price } = ingredient;

  return (
    <>
      <li className={styles.ingred_item} onClick={openModWin}>
        {counter && <Counter count={counter} size='default' extraClass={styles.counter} />}
        <img src={image} alt={name} className={styles.ingred_margin} />
        <span className={styles.price_item}>
          {price}
          <CurrencyIcon type='primary' />
        </span>
        <span>
          {name}
        </span>
      </li>
      {isShowModal && (
        <Modal text='Детали ингредиента' closeModWin={closeModWin}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
};

IngredientItem.propTypes = {
  ingredient: ingredientPropType,
  counter: PropTypes.number
};

export default IngredientItem;
