import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  sortIngredients,
  removeIngredient,
} from "../../services/slices/burger-constructor-slice";
import { memo, FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "../../hooks/hooks-types";
import { BurgerConstructorIngredient } from "../../types";
import styles from "./burger-constructor-item.module.css";

interface Item {
  id: string;
  originalIndex: number;
}

interface BurgerConstructorItemProps {
  ingredient: BurgerConstructorIngredient;
  moveIngredient: (id: string, atIndex: number) => void;
  findIngredient: (id: string) => { index: number };
}

const BurgerConstructorItem: FC<BurgerConstructorItemProps> = memo(
  function BurgerConstructorItem({
    ingredient,
    moveIngredient,
    findIngredient,
  }) {
    const dispatch = useDispatch();

    const originalIndex = findIngredient(ingredient.id).index;

    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: "burgerConstructorIngredient",
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
        accept: "burgerConstructorIngredient",
        hover({ id: draggedId }: Item) {
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

    const handleDeleteIngredient = (
      ingredient: BurgerConstructorIngredient,
    ) => {
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
          handleClose={() => handleDeleteIngredient(ingredient)}
        />
      </li>
    );
  },
);

export default BurgerConstructorItem;
