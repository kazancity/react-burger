import BurgerConstructorItemBase from "../burger-constructor-item-base/burger-constructor-item-base";
import BurgerConstructorItemBun from "../burger-constructor-item-bun/burger-constructor-item-bun";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import styles from "./burger-constructor-item-list.module.css";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import update from "immutability-helper";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";

const BurgerConstructorItemList = memo(function BurgerConstructorItemList({
  dropHandler,
}) {
  const { bun, ingredients } = useSelector((store) => store.burgerConstructor);

  const [constructorIngredients, setConstructorIngredients] =
    useState(ingredients);

  useEffect(() => {
    setConstructorIngredients(ingredients);
  }, [ingredients]);

  const findIngredient = useCallback(
    (id) => {
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
    (id, atIndex) => {
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
    drop(ingredient) {
      dropHandler(ingredient);
    },
  });

  const addBun = (position) =>
    bun ? (
      <BurgerConstructorItemBun
        ingredient={bun}
        position={position}
        extraClass={styles.item_lock}
      />
    ) : (
      <BurgerConstructorItemBase
        text="Выберите булки"
        position={position}
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
});

BurgerConstructorItemList.propTypes = {
  dropHandler: PropTypes.func.isRequired,
};

export default BurgerConstructorItemList;
