import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "../../utils/API";

export const getIngredients = createAsyncThunk(
  "burgerIngredients/getIngredients",
  fetchIngredients,
);

const initialState = {
  isLoading: false,
  isError: false,
  data: null,
};

const burgerIngredientsSlice = createSlice({
  name: "burgerIngredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => ({
        isLoading: true,
        isError: false,
      }))
      .addCase(getIngredients.fulfilled, (state, action) => ({
        isLoading: false,
        isError: false,
        data: action.payload,
      }))
      .addCase(getIngredients.rejected, (state) => ({
        isLoading: false,
        isError: true,
        data: null,
      }));
  },
});

export default burgerIngredientsSlice;
