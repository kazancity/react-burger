import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  clearOrder,
  getOrder,
  updateOrder,
} from "../../services/slices/order-details-slice";
import { getUniqIngredientsWithAmount } from "../../utils/sort-ingredients";
import { useDispatch, useSelector } from "../../hooks/hooks-types";
import { useLocation, useParams } from "react-router-dom";
import styles from "./order-info.module.css";
import { GridLoader } from "react-spinners";
import { Statuses } from "../../types";
import { useEffect } from "react";

const OrderInfo = () => {
  const { number } = useParams();
  const { isLoading: ingredientsLoading, data } = useSelector(
    (store) => store.burgerIngredients,
  );
  const {
    isLoading: orderLoading,
    isError,
    data: order,
  } = useSelector((store) => store.orderDetails);
  const { orders } = useSelector((store) => store.webSocket);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      dispatch(getOrder(number!));
    }
    return () => {
      dispatch(clearOrder());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const foundedOrder = orders.find(
      (order) => order.number.toString() === number,
    );
    if (!order) {
      if (foundedOrder) {
        dispatch(updateOrder(foundedOrder));
      }
    } else {
      if (foundedOrder && foundedOrder.status !== order.status) {
        dispatch(updateOrder(foundedOrder));
      }
    }
  }, [dispatch, number, order, orders]);

  const ingredients =
    order && getUniqIngredientsWithAmount(order.ingredients, data);

  return (
    <div className={styles.order}>
      <GridLoader
        color="#8585ad"
        loading={ingredientsLoading || orderLoading}
        cssOverride={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate('-50%', '-50%')",
        }}
      />
      {isError && <h2>Ошибка при загрузке заказа</h2>}
      {!location.state && !orderLoading && !isError && !order && (
        <h2>{`Заказ #0${number} не найден`}</h2>
      )}
      {order && (
        <>
          <h2
            className={"text text_type_digits-default"}
          >{`#0${order.number}`}</h2>
          <span className="text text_type_main-medium mt-10">{order.name}</span>
          <span
            className={`${styles.status} text text_type_main-default mt-3 ${order.status === "done" ? styles.done : ""}`}
          >
            {Statuses[order.status]}
          </span>
          <span className="text text_type_main-medium mt-15">Состав:</span>
          <ul className={`${styles.ingredients} mt-6`}>
            {ingredients?.map((ingredient) => (
              <li key={ingredient._id} className={styles.ingredient}>
                <div className={styles["preview-container"]}>
                  <img
                    src={ingredient.image_mobile}
                    alt={ingredient.name}
                    className={styles.preview}
                  />
                </div>
                <span>{ingredient.name}</span>
                <div className={`${styles.price} ${styles.amount}`}>
                  <span className="text text_type_digits-default">{`${ingredient.amount} x ${ingredient.price}`}</span>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            ))}
          </ul>
          <div className={`${styles.total} mt-10`}>
            <FormattedDate
              className="text text_type_main-default text_color_inactive"
              date={new Date(order.createdAt)}
            />
            <div className={styles.price}>
              <span className="text text_type_digits-default">
                {ingredients?.reduce(
                  (acc, ingredient) =>
                    (acc += ingredient.price * ingredient.amount),
                  0,
                )}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderInfo;
