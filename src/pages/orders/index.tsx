import { connect, disconnect } from "../../services/slices/websocket-slice";
import { useDispatch, useSelector } from "../../hooks/hooks-types";
import OrderList from "../../components/order-list";
import { WebSocketStatus } from "../../types";
import { GridLoader } from "react-spinners";
import styles from "./orders.module.css";
import { useEffect } from "react";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { status, orders } = useSelector((store) => store.webSocket);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken)
      dispatch(connect(`orders?token=${accessToken.substring(7)}`));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  return (
    <div className={styles.orders}>
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
      {status === WebSocketStatus.ONLINE && orders.length > 0 && (
        <OrderList
          isShowStatus={true}
          linkEndpoint="/profile/orders"
          isOrdersReverse={true}
        />
      )}
    </div>
  );
}
