import done from '../../images/done.png';
import styles from './order-details.module.css';

const OrderDetails = _ => {
  return (
    <div className={styles.order}>
      <span className={styles.number}>
        034536
      </span>
      <span className={styles.text_main_medium}>
        идентификатор заказа
      </span>
      <img src={done} alt='Done' className={styles.text_60} />
      <span className={`${styles.text_main} ${styles.text_60}`}>
        Ваш заказ начали готовить
      </span>
      <span className={`${styles.text_main} ${styles.text_inactive}`}>
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};

export default OrderDetails;
