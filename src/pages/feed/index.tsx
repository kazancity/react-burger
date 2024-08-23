import { getIngredients } from "../../services/slices/burger-ingredients-slice";
import { connect, disconnect } from "../../services/slices/websocket-slice";
import { useDispatch, useSelector } from "../../hooks/hooks-types";
import OrderCounter from "../../components/order-counter";
import OrderList from "../../components/order-list";
import { WebSocketStatus } from "../../types";
import { GridLoader } from "react-spinners";
import styles from "./feed.module.css";
import { useEffect } from "react";

export default function FeedPage() {
  const dispatch = useDispatch();
  const { status, orders } = useSelector((store) => store.webSocket);

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(connect("orders/all"));

    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  return (
    <main className={`${styles.main} pr-5 pl-5`}>
      <GridLoader
        color="#8585ad"
        loading={status !== WebSocketStatus.ONLINE}
        cssOverride={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate('-50%', '-50%')",
        }}
      />
      <h1 className="text text_type_main-large mt-10">Лента заказов</h1>
      {status === WebSocketStatus.ONLINE && orders.length > 0 && (
        <div className={`${styles.container} mt-5`}>
          <OrderList isShowStatus={false} linkEndpoint="/feed" />
          <OrderCounter />
        </div>
      )}
    </main>
  );
}
