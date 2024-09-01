import { BurgerConstructorIngredient, Ingredient } from "../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BurgerConstructorStore } from "../../types";
import { v4 as uuidv4 } from "uuid";

export const initialState = {
  bun: null,
  ingredients: [],
} satisfies BurgerConstructorStore as BurgerConstructorStore;

export const prepareIngredient = (ingredient: Ingredient) => ({
  payload: { ...ingredient, id: uuidv4() } as BurgerConstructorIngredient,
});

const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<BurgerConstructorIngredient>) =>
        action.payload.type === "bun"
          ? { ...state, bun: action.payload }
          : { ...state, ingredients: [...state.ingredients, action.payload] },
      prepare: prepareIngredient,
    },
    removeIngredient: (
      state,
      action: PayloadAction<BurgerConstructorIngredient>,
    ) => ({
      ...state,
      ingredients: state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id,
      ),
    }),
    sortIngredients: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>,
    ) => {
      const ingredients = [...state.ingredients];
      const { fromIndex, toIndex } = action.payload;
      ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0]);
      return { ...state, ingredients };
    },
    clearBurgerConstructor: () => ({ ...initialState }),
  },
});

export const {
  addIngredient,
  removeIngredient,
  sortIngredients,
  clearBurgerConstructor,
} = burgerConstructorSlice.actions;

type burgerConstructorActionCreators = typeof burgerConstructorSlice.actions;
export type burgerConstructorActions = ReturnType<
  burgerConstructorActionCreators[keyof burgerConstructorActionCreators]
>;

export default burgerConstructorSlice;
