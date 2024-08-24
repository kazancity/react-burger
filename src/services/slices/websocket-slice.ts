import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebSocketStatus, WebSocketStore, WSOrderResponse } from "../../types";

export const wsOpen = createAction("webSocket/open");
export const wsClose = createAction("webSocket/close");
export const wsMessage = createAction<WSOrderResponse, "webSocket/message">(
  "webSocket/message",
);
export const wsError = createAction<string, "webSocket/error">(
  "webSocket/error",
);

const initialState: WebSocketStore = {
  status: WebSocketStatus.OFFLINE,
  orders: [],
  total: 0,
  totalToday: 0,
  error: "",
};

const webSocketSlice = createSlice({
  name: "webSocket",
  initialState,
  reducers: {
    connect: (state, action: PayloadAction<string>) => ({
      ...state,
      status: WebSocketStatus.OPENING,
    }),
    disconnect: (state) => ({ ...state, status: WebSocketStatus.CLOSING }),
  },
  extraReducers: (builder) => {
    builder.addCase(wsOpen, (state) => {
      state.status = WebSocketStatus.ONLINE;
      state.error = "";
    });
    builder.addCase(wsError, (state, action) => {
      state.status = WebSocketStatus.OFFLINE;
      state.error = action.payload;
    });
    builder.addCase(wsMessage, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
    builder.addCase(wsClose, () => ({ ...initialState }));
  },
});

export const { connect, disconnect } = webSocketSlice.actions;

export const wsActions = {
  wsConnect: connect,
  wsDisconnect: disconnect,
  onOpen: wsOpen,
  onClose: wsClose,
  onMessage: wsMessage,
  onError: wsError,
};

type webSocketActionCreators = typeof webSocketSlice.actions;
export type webSocketActions =
  | ReturnType<webSocketActionCreators[keyof webSocketActionCreators]>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;

export default webSocketSlice;
