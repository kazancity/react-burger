import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "../../utils/API";
import { BurgerIngredientStore } from "../../types";

export const getIngredients = createAsyncThunk(
  "burgerIngredients/getIngredients",
  fetchIngredients,
);

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
} satisfies BurgerIngredientStore as BurgerIngredientStore;

const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => ({
      ...state,
      isLoading: true,
      isError: false,
    }));
    builder.addCase(getIngredients.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      isError: false,
      data: action.payload,
    }));
    builder.addCase(getIngredients.rejected, (state) => ({
      ...state,
      isLoading: false,
      isError: true,
      data: null,
    }));
  },
});

export default burgerIngredientsSlice;
