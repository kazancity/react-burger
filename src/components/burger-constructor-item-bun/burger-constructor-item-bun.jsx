import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-item-bun.module.css";
import { ingredientPropType } from "../../utils/types";
import PropTypes from "prop-types";

const BurgerConstructorItemBun = ({
  ingredient,
  position,
  extraClass = null,
}) => {
  return (
    <div className={`${styles.item} ${extraClass}`}>
      <ConstructorElement
        text={`${ingredient.name}${position === "top" ? " (верх)" : " (низ)"}`}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        type={position}
        isLocked={true}
        extraClass={styles.element}
      />
    </div>
  );
};

BurgerConstructorItemBun.propTypes = {
  extraClass: PropTypes.string,
  position: PropTypes.string.isRequired,
  ingredient: ingredientPropType.isRequired,
};

export default BurgerConstructorItemBun;
