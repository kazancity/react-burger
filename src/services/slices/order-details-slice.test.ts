import orderDetailsSlice, {
  initialState,
  clearOrder,
  updateOrder,
  sendOrder,
  getOrder,
} from "./order-details-slice";
import { Order } from "../../types";

const order: Order = {
  _id: "66cd46ad119d45001b50245c",
  ingredients: [
    "643d69a5c3f7b9001cfa093c",
    "643d69a5c3f7b9001cfa093e",
    "643d69a5c3f7b9001cfa093e",
    "643d69a5c3f7b9001cfa093c",
  ],
  status: "done",
  name: "Краторный люминесцентный бургер",
  createdAt: "2024-08-27T03:23:25.061Z",
  updatedAt: "2024-08-27T03:23:28.659Z",
  number: 51251,
};

describe("ingredientDetailsSlice", () => {
  it("should initialize correctly", () => {
    const state = orderDetailsSlice.reducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("clearOrder", () => {
    const action = { type: clearOrder.type };
    const state = orderDetailsSlice.reducer(
      { ...initialState, data: order },
      action,
    );
    expect(state).toEqual(initialState);
  });

  it("updateOrder", () => {
    const action = { type: updateOrder.type, payload: order };
    const state = orderDetailsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, data: order });
  });

  describe("sendOrder", () => {
    it("pending", () => {
      const action = { type: sendOrder.pending.type };
      const state = orderDetailsSlice.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: true,
        isError: false,
      });
    });

    it("fulfilled", () => {
      const action = { type: sendOrder.fulfilled.type, payload: order };
      const state = orderDetailsSlice.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        isError: false,
        data: order,
      });
    });

    it("rejected", () => {
      const action = { type: sendOrder.rejected.type };
      const state = orderDetailsSlice.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        isError: true,
        data: null,
      });
    });
  });

  describe("getOrder", () => {
    it("pending", () => {
      const action = { type: getOrder.pending.type };
      const state = orderDetailsSlice.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: true,
        isError: false,
      });
    });

    it("fulfilled", () => {
      const action = { type: getOrder.fulfilled.type, payload: order };
      const state = orderDetailsSlice.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        isError: false,
        data: order,
      });
    });

    it("rejected", () => {
      const action = { type: getOrder.rejected.type };
      const state = orderDetailsSlice.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        isLoading: false,
        isError: true,
        data: null,
      });
    });
  });
});
