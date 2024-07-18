import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { setData } from "../../services/slices/ingredient-details-slice";
import styles from "./burger-ingredients-item.module.css";
import { ingredientPropType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
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

  const { name, image, price } = ingredient;
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
  });

  const handleShowIngredientDetails = () => {
    dispatch(setData(ingredient));
  };

  return (
    <>
      <li
        className={styles.ingred_item}
        onClick={handleShowIngredientDetails}
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
    </>
  );
};

BurgerIngredientsItem.propTypes = { ingredient: ingredientPropType.isRequired };

export default BurgerIngredientsItem;
