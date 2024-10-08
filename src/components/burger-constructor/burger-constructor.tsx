import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  addIngredient,
  clearBurgerConstructor,
} from "../../services/slices/burger-constructor-slice";
import BurgerConstructorItemList from "../burger-constructor-item-list/burger-constructor-item-list";
import { sendOrder } from "../../services/slices/order-details-slice";
import { useDispatch, useSelector } from "../../hooks/hooks-types";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./burger-constructor.module.css";
import { ArrayData, Ingredient } from "../../types";
import { useMemo } from "react";

const BurgerConstructor = () => {
  const { bun, ingredients } = useSelector((store) => store.burgerConstructor);
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const totalPrice: number = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    return (
      bunPrice +
      ingredients.reduce(
        (acc: number, ingredient: Ingredient) => acc + ingredient.price,
        0,
      )
    );
  }, [bun, ingredients]);

  const handleSubmitOrder = () => {
    if (!user) {
      return navigate("/login", { state: { from: location } });
    }

    if (bun && ingredients.length) {
      const preparedData: ArrayData = {
        ingredients: [
          bun._id,
          ...ingredients.map((ingredient) => ingredient._id),
          bun._id,
        ],
      };
      dispatch(sendOrder(preparedData)).then(() =>
        dispatch(clearBurgerConstructor()),
      );
      navigate("/", { state: { backgroundLocation: location } });
    }
  };

  const handleIngredientDrop = (ingredient: Ingredient) => {
    dispatch(addIngredient(ingredient));
  };

  return (
    <article className={styles.menu_constructor}>
      <BurgerConstructorItemList onDropHandler={handleIngredientDrop} />
      <div className={styles.order}>
        <span className={styles.checkout}>
          {totalPrice}
          <CurrencyIcon type="primary" />
        </span>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleSubmitOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </article>
  );
};

export default BurgerConstructor;
