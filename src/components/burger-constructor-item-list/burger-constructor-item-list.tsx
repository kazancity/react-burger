import {
  BurgerConstructorItemType,
  BurgerConstructorIngredient,
  ConstructorIngredients,
  Ingredient,
} from "../../types";
import BurgerConstructorItemBase from "../burger-constructor-item-base/burger-constructor-item-base";
import BurgerConstructorItemBun from "../burger-constructor-item-bun/burger-constructor-item-bun";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import { FC, memo, useCallback, useEffect, useState } from "react";
import styles from "./burger-constructor-item-list.module.css";
import { useSelector } from "../../hooks/hooks-types";
import update from "immutability-helper";
import { useDrop } from "react-dnd";

interface BurgerConstructorListProps {
  onDropHandler: (ingredient: Ingredient) => void;
}

const BurgerConstructorItemList: FC<BurgerConstructorListProps> = memo(
  function BurgerConstructorItemList({ onDropHandler }) {
    const { bun, ingredients } = useSelector(
      (store) => store.burgerConstructor,
    );

    const [constructorIngredients, setConstructorIngredients] =
      useState<ConstructorIngredients>(ingredients);

    useEffect(() => {
      setConstructorIngredients(ingredients);
    }, [ingredients]);

    const findIngredient = useCallback(
      (id: string) => {
        const ingredient = constructorIngredients.filter(
          (ingredient) => ingredient.id === id,
        )[0];
        return {
          ingredient,
          index: constructorIngredients.indexOf(ingredient),
        };
      },
      [constructorIngredients],
    );

    const moveIngredient = useCallback(
      (id: string, atIndex: number) => {
        const { ingredient, index } = findIngredient(id);
        setConstructorIngredients(
          update(constructorIngredients, {
            $splice: [
              [index, 1],
              [atIndex, 0, ingredient],
            ],
          }),
        );
      },
      [findIngredient, constructorIngredients],
    );

    const [, dropTarget] = useDrop({
      accept: "ingredient",
      drop(item: { ingredient: BurgerConstructorIngredient }) {
        onDropHandler(item.ingredient);
      },
    });

    const addBun = (type: BurgerConstructorItemType) =>
      bun ? (
        <BurgerConstructorItemBun
          ingredient={bun}
          type={type}
          extraClass={styles.item_lock}
        />
      ) : (
        <BurgerConstructorItemBase
          text="Выберите булки"
          type={type}
          extraClass={styles.item_lock}
        />
      );

    return (
      <section className={styles.item_section} ref={dropTarget}>
        {addBun("top")}
        <ul className={styles.item_list}>
          {constructorIngredients.length ? (
            constructorIngredients.map((ingredient) => (
              <BurgerConstructorItem
                key={ingredient.id}
                ingredient={ingredient}
                moveIngredient={moveIngredient}
                findIngredient={findIngredient}
              />
            ))
          ) : (
            <BurgerConstructorItemBase text="Выберите начинку и соусы" />
          )}
        </ul>

        {addBun("bottom")}
      </section>
    );
  },
);

export default BurgerConstructorItemList;
