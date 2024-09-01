import webSocketSlice, {
  initialState,
  connect,
  disconnect,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
} from "./websocket-slice";
import { Order, WebSocketStatus, WSOrderResponse } from "../../types";

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

const message: WSOrderResponse = {
  success: true,
  orders: [order],
  total: 100,
  totalToday: 1,
};

describe("webSocketSlice", () => {
  it("should initialize correctly", () => {
    const state = webSocketSlice.reducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("connect", () => {
    const action = { type: connect.type };
    const state = webSocketSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: WebSocketStatus.OPENING });
  });

  it("disconnect", () => {
    const action = { type: disconnect.type };
    const state = webSocketSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: WebSocketStatus.CLOSING });
  });

  it("wsOpen", () => {
    const action = { type: wsOpen.type };
    const state = webSocketSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: WebSocketStatus.ONLINE,
      error: "",
    });
  });

  it("wsClose", () => {
    const action = { type: wsClose.type };
    const state = webSocketSlice.reducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it("wsError", () => {
    const action = { type: wsError.type, payload: "Error message" };
    const state = webSocketSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: WebSocketStatus.OFFLINE,
      error: "Error message",
    });
  });

  it("wsMessage", () => {
    const action = { type: wsMessage.type, payload: message };
    const state = webSocketSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: message.orders,
      total: message.total,
      totalToday: message.totalToday,
    });
  });
});
