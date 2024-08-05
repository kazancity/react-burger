import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-item-base.module.css";
import { BurgerConstructorItemType } from "../../types";
import { FC } from "react";

interface BurgerConstructorItemBaseProps {
  text: string;
  extraClass?: string;
  type?: BurgerConstructorItemType;
}

const BurgerConstructorItemBase: FC<BurgerConstructorItemBaseProps> = ({
  text,
  type,
  extraClass = "",
}) => {
  return (
    <div className={`${styles.item} ${extraClass}`}>
      <ConstructorElement
        thumbnail=""
        price={0}
        text={text}
        type={type}
        extraClass={styles.element}
      />
    </div>
  );
};

export default BurgerConstructorItemBase;
