import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientDetailsStore } from "../../types";
import { Ingredient } from "../../types";

const initialState = {
  data: null,
} satisfies IngredientDetailsStore as IngredientDetailsStore;

const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Ingredient>) => ({
      ...state,
      data: action.payload,
    }),
    resetData: (state) => ({ ...state, data: null }),
  },
});

export const { setData, resetData } = ingredientDetailsSlice.actions;

type ingredientDetailsActionCreators = typeof ingredientDetailsSlice.actions;
export type ingredientDetailsActions = ReturnType<
  ingredientDetailsActionCreators[keyof ingredientDetailsActionCreators]
>;

export default ingredientDetailsSlice;
