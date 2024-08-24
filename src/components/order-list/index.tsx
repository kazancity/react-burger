import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUniqIngredientsWithAmount } from "../../utils/sort-ingredients";
import { useSelector } from "../../hooks/hooks-types";
import { Link, useLocation } from "react-router-dom";
import styles from "./order-list.module.css";
import { GridLoader } from "react-spinners";
import { Statuses } from "../../types";
import { FC } from "react";

interface OrderListProps {
  isShowStatus: boolean;
  linkEndpoint: string;
  isOrdersReverse?: boolean;
}

const OrderList: FC<OrderListProps> = ({
  isShowStatus,
  linkEndpoint,
  isOrdersReverse = false,
}) => {
  const { isLoading, isError, data } = useSelector(
    (store) => store.burgerIngredients,
  );
  const location = useLocation();
  const { orders } = useSelector((store) => store.webSocket);
  const checkedOrders = isOrdersReverse ? [...orders].reverse() : orders;

  return (
    <ul className={styles.list}>
      <GridLoader
        color="#8585ad"
        loading={isLoading}
        cssOverride={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate('-50%', '-50%')",
        }}
      />
      {isError && <>Ошибка при загрузке ингредиентов</>}
      {data &&
        checkedOrders.map((order) => {
          const ingredients = getUniqIngredientsWithAmount(
            order.ingredients,
            data,
          );
          return (
            <Link
              className={styles.link}
              key={order._id}
              to={`${linkEndpoint}/${order.number}`}
              state={{ backgroundLocation: location }}
            >
              <li className={styles.card}>
                <div className={styles.id}>
                  <span className="text text_type_digits-default">{`#0${order.number}`}</span>
                  <FormattedDate
                    className="text text_type_main-default text_color_inactive"
                    date={new Date(order.createdAt)}
                  />
                </div>
                <div className={styles.info}>
                  <span className="text text_type_main-medium">
                    {order.name}
                  </span>
                  {isShowStatus &&
                    (order.status === "done" ? (
                      <span className={styles.done}>{Statuses["done"]}</span>
                    ) : (
                      <span>{Statuses[order.status]}</span>
                    ))}
                </div>
                <div className={styles.components}>
                  <ul className={styles.ingredients}>
                    {ingredients.map((ingredient, i) => {
                      return ingredient.type === "bun" ? (
                        <li
                          key={i}
                          className={styles.ingredient}
                          style={{
                            transform: `translate(${-16 * i}px`,
                            zIndex: `${100 - i}`,
                          }}
                        >
                          <img
                            src={ingredient?.image_mobile}
                            alt={ingredient?.name}
                            className={styles.preview}
                          />
                        </li>
                      ) : ingredient.amount > 1 ? (
                        <li
                          key={i}
                          className={styles.ingredient}
                          style={{
                            transform: `translate(${-16 * i}px`,
                            zIndex: `${100 - i}`,
                          }}
                        >
                          <img
                            src={ingredient?.image_mobile}
                            alt={ingredient?.name}
                            className={`${styles.preview} ${styles["preview-overlay"]}`}
                          />
                          <span
                            className={`${styles["preview-amount"]} text`}
                          >{`+${ingredient.amount}`}</span>
                        </li>
                      ) : (
                        <li
                          key={i}
                          className={styles.ingredient}
                          style={{
                            transform: `translate(${-16 * i}px`,
                            zIndex: `${100 - i}`,
                          }}
                        >
                          <img
                            src={ingredient?.image_mobile}
                            alt={ingredient?.name}
                            className={styles.preview}
                          />
                        </li>
                      );
                    })}
                  </ul>
                  <div className={styles.price}>
                    <span className="text text_type_digits-default">
                      {ingredients.reduce(
                        (acc, ingredient) =>
                          acc + ingredient.price * ingredient.amount,
                        0,
                      )}
                    </span>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              </li>
            </Link>
          );
        })}
    </ul>
  );
};

export default OrderList;
