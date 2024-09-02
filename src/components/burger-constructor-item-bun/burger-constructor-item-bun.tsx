import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-item-bun.module.css";
import { Ingredient, BurgerConstructorItemType } from "../../types";
import { FC } from "react";

interface BurgerConstructorItemBunProps {
  ingredient: Ingredient;
  type: BurgerConstructorItemType;
  extraClass?: string;
}

const BurgerConstructorItemBun: FC<BurgerConstructorItemBunProps> = ({
  ingredient,
  type,
  extraClass = "",
}) => {
  return (
    <div
      className={`${styles.item} ${extraClass}`}
      data-testid="constructor-item-bun"
    >
      <ConstructorElement
        text={`${ingredient.name}${type === "top" ? " (верх)" : " (низ)"}`}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        type={type}
        isLocked={true}
        extraClass={styles.element}
      />
    </div>
  );
};

export default BurgerConstructorItemBun;
