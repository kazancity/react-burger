import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import BurgerConstructorItemList from "../burger-constructor-item-list/burger-constructor-item-list";
import useModalControl from "../../hooks/use-modal-control";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { sendOrder } from "../../services/slices/order-details-slice";
import { addIngredient } from "../../services/slices/burger-сonstructor-slice";

const BurgerConstructor = () => {
  const { isShowModal, openModWin, closeModWin } = useModalControl(false);
  const { bun, ingredients } = useSelector((store) => store.burgerConstructor);
  const { isLoading } = useSelector((store) => store.burgerIngredients);

  const dispatch = useDispatch();

  const totalPrice = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    return (
      bunPrice +
      ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)
    );
  }, [bun, ingredients]);

  const processingOrder = () => {
    if (bun && ingredients.length) {
      const preparedOrderData = {
        ingredients: [
          bun._id,
          ...ingredients.map((ingredient) => ingredient._id),
          bun._id,
        ],
      };
      dispatch(sendOrder(preparedOrderData));
      openModWin();
    }
  };

  const processingIngredient = (item) => {
    dispatch(addIngredient(item.ingredient));
  };

  return (
    !isLoading && (
      <article className={styles.menu_constructor}>
        <BurgerConstructorItemList
          bun={bun}
          ingredients={ingredients}
          dropHandler={processingIngredient}
        />
        <div className={styles.order}>
          <span className={styles.checkout}>
            {totalPrice}
            <CurrencyIcon type="primary" />
          </span>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={processingOrder}
          >
            Оформить заказ
          </Button>
        </div>
        {isShowModal && (
          <Modal closeModWin={closeModWin}>
            <OrderDetails />
          </Modal>
        )}
      </article>
    )
  );
};

export default BurgerConstructor;
