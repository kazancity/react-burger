import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { setData } from "../../services/slices/ingredient-details-slice";
import useModalControl from "../../hooks/use-modal-control";
import styles from "./burger-ingredients-item.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ingredientPropType } from "../../utils/types";
import { useDrag } from "react-dnd";
import Modal from "../modal/modal";
import { useMemo } from "react";

const BurgerIngredientsItem = ({ ingredient }) => {
  const { bun, ingredients } = useSelector((store) => store.burgerConstructor);

  const counter = useMemo(() => {
    if (ingredient.type === "bun") {
      return bun && bun._id === ingredient._id ? 2 : null;
    }
    return (
      ingredients.filter((item) => item._id === ingredient._id).length || null
    );
  }, [bun, ingredients, ingredient.type, ingredient._id]);

  const { isShowModal, openModWin, closeModWin } = useModalControl(false);
  const { name, image, price } = ingredient;
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
  });

  const processShowIngredientDetails = () => {
    dispatch(setData(ingredient));
    openModWin();
  };

  return (
    <>
      <li
        className={styles.ingred_item}
        onClick={processShowIngredientDetails}
        ref={dragRef}
      >
        {counter && <Counter count={counter} size="default" />}
        <img src={image} alt={name} className={styles.ingred_margin} />
        <span className={styles.price_item}>
          {price}
          <CurrencyIcon type="primary" />
        </span>
        <span>{name}</span>
      </li>
      {isShowModal && (
        <Modal text="Детали ингредиента" closeModWin={closeModWin}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};

BurgerIngredientsItem.propTypes = { ingredient: ingredientPropType };

export default BurgerIngredientsItem;
