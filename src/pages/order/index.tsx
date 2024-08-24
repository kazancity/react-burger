import { getIngredients } from "../../services/slices/burger-ingredients-slice";
import { useDispatch } from "../../hooks/hooks-types";
import OrderInfo from "../../components/order-info";
import styles from "./order.module.css";
import { useEffect } from "react";

export default function OrderPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <OrderInfo />
    </main>
  );
}
