import { clearOrder } from "../../services/slices/order-details-slice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./order-details.module.css";
import done from "../../images/done.png";
import { useEffect } from "react";

const OrderDetails = () => {
  const { isError, data } = useSelector((store) => store.orderDetails);
  const dispatch = useDispatch();
  useEffect(() => () => dispatch(clearOrder()), []);

  return (
    <div className={styles.order}>
      {data && (
        <>
          <span className={styles.number}>{data.order.number}</span>
          <span className={styles.text_main_medium}>идентификатор заказа</span>
          <img src={done} alt="Done" className={styles.text_60} />
          <span className={`${styles.text_main} ${styles.text_60}`}>
            Ваш заказ начали готовить
          </span>
          <span className={`${styles.text_main} ${styles.text_inactive}`}>
            Дождитесь готовности на орбитальной станции
          </span>
        </>
      )}
      {isError && <>В процессе отправки заказа произошла ошибка!</>}
    </div>
  );
};

export default OrderDetails;
