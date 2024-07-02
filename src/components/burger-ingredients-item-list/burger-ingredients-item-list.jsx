import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import styles from "./burger-ingredients-item-list.module.css";
import { ingredientPropType } from "../../utils/types";
import { forwardRef } from "react";
import PropTypes from "prop-types";

const BurgerIngredientsItemList = forwardRef(function BurgerIngredientsItemList(
  { ingredients, title, type },
  ref,
) {
  return (
    <section>
      <h2 ref={ref}>{title}</h2>
      <ul className={styles.item_group}>
        {ingredients
          .filter((ingredient) => ingredient.type === type)
          .map((ingredient) => (
            <BurgerIngredientsItem
              key={ingredient._id}
              ingredient={ingredient}
            />
          ))}
      </ul>
    </section>
  );
});

BurgerIngredientsItemList.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType),
  title: PropTypes.string,
  type: PropTypes.string,
};

export default BurgerIngredientsItemList;
