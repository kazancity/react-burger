import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-item-base.module.css";
import PropTypes from "prop-types";

const BurgerConstructorItemBase = ({
  text,
  position = "",
  extraClass = "",
}) => {
  return (
    <div className={`${styles.item} ${extraClass}`}>
      <ConstructorElement
        text={text}
        type={position}
        extraClass={styles.element}
      />
    </div>
  );
};

BurgerConstructorItemBase.propTypes = {
  text: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
  position: PropTypes.string,
};

export default BurgerConstructorItemBase;
