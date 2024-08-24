import { clearOrder } from "../../services/slices/order-details-slice";
import { useDispatch, useSelector } from "../../hooks/hooks-types";
import styles from "./order-details.module.css";
import { Navigate } from "react-router-dom";
import done from "../../images/done.png";
import { useEffect } from "react";

const OrderDetails = () => {
  const { isError, data: order } = useSelector((store) => store.orderDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearOrder());
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.order}>
      {order ? (
        <>
          <span className={styles.number}>{order.number}</span>
          <span className={styles.text_main_medium}>идентификатор заказа</span>
          <img src={done} alt="Done" className={styles.text_60} />
          <span className={`${styles.text_main} ${styles.text_60}`}>
            Ваш заказ начали готовить
          </span>
          <span className={`${styles.text_main} ${styles.text_inactive}`}>
            Дождитесь готовности на орбитальной станции
          </span>
        </>
      ) : (
        <Navigate to="/" replace={true} />
      )}
      {isError && <>В процессе отправки заказа произошла ошибка!</>}
    </div>
  );
};

export default OrderDetails;
