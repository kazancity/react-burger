import burgerConstructorSlice, {
  burgerConstructorActions,
} from "./slices/burger-constructor-slice";
import ingredientDetailsSlice, {
  ingredientDetailsActions,
} from "./slices/ingredient-details-slice";
import orderDetailsSlice, {
  orderDetailsActions,
} from "./slices/order-details-slice";
import { combineSlices, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import ordersSlice, { webSocketActions } from "./slices/websocket-slice";
import burgerIngredientsSlice from "./slices/burger-ingredients-slice";
import { socketMiddleware } from "./middleware/websocket-middleware";
import { wsActions } from "./slices/websocket-slice";
import userSlice from "./slices/user-slice";
import { WebSocketStatus } from "../types";

export const rootReducer = combineSlices(
  burgerIngredientsSlice,
  burgerConstructorSlice,
  ingredientDetailsSlice,
  orderDetailsSlice,
  userSlice,
  ordersSlice,
);

export const preloadedState = {
  burgerIngredients: { data: null, isLoading: false, isError: false },
  burgerConstructor: { bun: null, ingredients: [] },
  ingredientDetails: { data: null },
  orderDetails: { data: null, isLoading: false, isError: false },
  user: { user: null, isAuthChecked: false },
  webSocket: {
    status: WebSocketStatus.OFFLINE,
    orders: [],
    total: 0,
    totalToday: 0,
    error: "",
  },
};

const wsUrl: string = "wss://norma.nomoreparties.space/";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsUrl, wsActions)),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppActions =
  | burgerConstructorActions
  | ingredientDetailsActions
  | orderDetailsActions
  | webSocketActions;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
