import { postOrder } from "../../utils/API";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { data: null, isLoading: false, isError: false };

export const sendOrder = createAsyncThunk("orderDetails/sendOrder", postOrder);

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    clearOrder: (state) => ({
      isLoading: false,
      isError: false,
      data: null,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => ({
        isLoading: true,
        isError: false,
        data: null,
      }))
      .addCase(sendOrder.fulfilled, (state, action) => ({
        isLoading: false,
        isError: false,
        data: action.payload,
      }))
      .addCase(sendOrder.rejected, (state) => ({
        isLoading: false,
        isError: true,
        data: null,
      }));
  },
});

export const { clearOrder } = orderDetailsSlice.actions;

export default orderDetailsSlice;
