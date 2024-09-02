import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { requestGetOrder, requestSendOrder } from "../../utils/API";
import { OrderDetailsStore } from "../../types";
import { Order } from "../../types";

export const initialState = {
  data: null,
  isLoading: false,
  isError: false,
} satisfies OrderDetailsStore as OrderDetailsStore;

export const getOrder = createAsyncThunk(
  "orderDetails/getOrder",
  requestGetOrder,
);
export const sendOrder = createAsyncThunk(
  "orderDetails/sendOrder",
  requestSendOrder,
);

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    clearOrder: () => initialState,
    updateOrder: (state, action: PayloadAction<Order>) => ({
      ...state,
      data: action.payload,
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
      }))
      .addCase(getOrder.pending, (state) => ({
        ...state,
        isLoading: true,
        isError: false,
        data: null,
      }))
      .addCase(getOrder.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      }))
      .addCase(getOrder.rejected, (state) => ({
        ...state,
        isLoading: false,
        isError: true,
        data: null,
      }));
  },
});

export const { clearOrder, updateOrder } = orderDetailsSlice.actions;

type orderDetailsActionCreators = typeof orderDetailsSlice.actions;
export type orderDetailsActions = ReturnType<
  orderDetailsActionCreators[keyof orderDetailsActionCreators]
>;

export default orderDetailsSlice;
