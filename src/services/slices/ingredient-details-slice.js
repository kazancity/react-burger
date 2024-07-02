import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: null };

const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    setData: (state, action) => ({
      data: action.payload,
    }),
    resetData: (state) => ({
      data: null,
    }),
  },
});

export const { setData, resetData } = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice;
