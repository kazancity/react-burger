import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from '../burger-constructor-item-list/burger-constructor-item-list';
import useModalControl from '../../hooks/use-modal-control';
import OrderDetails from '../order-details/order-details';
import { ingredientPropType } from '../../utils/types';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import PropTypes from 'prop-types'

const BurgerConstructor = ({ ingredients }) => {
  const { isShowModal, openModWin, closeModWin } = useModalControl(false);

  return (
    <article className={styles.menu_constructor}>
      <ConstructorList ingredients={ingredients} />
      <div className={styles.order}>
        <span className={styles.checkout}>
          {610}
          <CurrencyIcon type='primary' />
        </span>
        <Button htmlType='button' type='primary' size='large' onClick={openModWin}>
          Оформить заказ
        </Button>
      </div>
      {isShowModal && (
        <Modal closeModWin={closeModWin}>
          <OrderDetails />
        </Modal>
      )}
    </article>
  );
};

BurgerConstructor.propTypes = { ingredients: PropTypes.arrayOf(ingredientPropType) };

export default BurgerConstructor;
