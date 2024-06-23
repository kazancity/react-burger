import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-item.module.css";
import { ingredientPropType } from "../../utils/types";
import PropTypes from "prop-types";

const ConstructorItem = ({ ingredient, type = undefined, extraClass }) => {
  return (
    <div className={`${styles.item} ${extraClass}`}>
      {ingredient.type !== "bun" && <DragIcon type="primary" />}
      <ConstructorElement
        text={`${ingredient.name}${type == "top" ? " (верх)" : type == "bottom" ? " (низ)" : ""}`}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        type={type}
        isLocked={ingredient.type == "bun"}
        extraClass={styles.element_item}
      />
    </div>
  );
};

ConstructorItem.propTypes = {
  type: PropTypes.string,
  extraClass: PropTypes.string,
  ingredient: ingredientPropType,
};

export default ConstructorItem;
