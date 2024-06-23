import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientGroup from "../burger-ingredients-item-list/burger-ingredients-item-list";
import styles from "./burger-ingredients.module.css";
import { ingredientPropType } from "../../utils/types";
import PropTypes from "prop-types";

const BurgerIngredients = ({ ingredients }) => {
  return (
    <article>
      <h1>Соберите бургер</h1>
      <div className={styles.items}>
        <Tab key="bunTab" active>
          Булки
        </Tab>
        <Tab key="sauceTab">Соусы</Tab>
        <Tab key="mainTab">Начинки</Tab>
      </div>
      <div className={styles.items_group}>
        <IngredientGroup
          key="bunGroup"
          ingredients={ingredients}
          name="Булки"
          type="bun"
        />
        <IngredientGroup
          key="sauceGroup"
          ingredients={ingredients}
          name="Соусы"
          type="sauce"
        />
        <IngredientGroup
          key="mainGroup"
          ingredients={ingredients}
          name="Начинки"
          type="main"
        />
      </div>
    </article>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType),
};

export default BurgerIngredients;
