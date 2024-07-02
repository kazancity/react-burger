import { v4 as uuidv4 } from "uuid";
import { createSlice } from "@reduxjs/toolkit";

const initialState = { bun: null, ingredients: [] };

const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action) =>
        action.payload.type === "bun"
          ? {
              ...state,
              bun: action.payload,
            }
          : { ...state, ingredients: [...state.ingredients, action.payload] },
      prepare: (ingredient) => ({
        payload: {
          ...ingredient,
          id: uuidv4(),
        },
      }),
    },
    removeIngredient: (state, action) => ({
      ...state,
      ingredients: state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id,
      ),
    }),
    sortIngredients: (state, action) => {
      const ingredients = [...state.ingredients];
      const { fromIndex, toIndex } = action.payload;
      ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0]);
      return { ...state, ingredients };
    },
  },
});

export const { addIngredient, removeIngredient, sortIngredients } =
  burgerConstructorSlice.actions;

export default burgerConstructorSlice;
