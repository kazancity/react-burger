import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  removeIngredient,
  sortIngredients,
} from "../../services/slices/burger-сonstructor-slice";
import styles from "./burger-constructor-item.module.css";
import { ingredientPropType } from "../../utils/types";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { memo } from "react";

const BurgerConstructorItem = memo(function BurgerConstructorItem({
  ingredient,
  moveIngredient,
  findIngredient,
}) {
  const dispatch = useDispatch();

  const originalIndex = findIngredient(ingredient.id).index;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "constructorIngredient",
      item: { id: ingredient.id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveIngredient(droppedId, originalIndex);
        }
      },
    }),
    [originalIndex, moveIngredient],
  );

  const [, drop] = useDrop(
    () => ({
      accept: "constructorIngredient",
      hover({ id: draggedId }) {
        if (draggedId !== ingredient.id) {
          const { index: overIndex } = findIngredient(ingredient.id);
          moveIngredient(draggedId, overIndex);
        }
      },
      drop(item) {
        dispatch(
          sortIngredients({
            fromIndex: item.originalIndex,
            toIndex: findIngredient(item.id).index,
          }),
        );
      },
    }),
    [findIngredient, moveIngredient],
  );
  const opacity = isDragging ? 0 : 1;

  const processRemoveIngredient = (ingredient) => {
    dispatch(removeIngredient(ingredient));
  };

  return (
    <li
      className={styles.item}
      style={{ opacity }}
      ref={(node) => drag(drop(node))}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        extraClass={styles.element_item}
        handleClose={() => processRemoveIngredient(ingredient)}
      />
    </li>
  );
});

BurgerConstructorItem.propTypes = {
  ingredient: ingredientPropType.isRequired,
  moveIngredient: PropTypes.func.isRequired,
  findIngredient: PropTypes.func.isRequired,
};

export default BurgerConstructorItem;
