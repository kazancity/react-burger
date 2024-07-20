import burgerConstructorSlice from "./slices//burger-сonstructor-slice";
import ingredientDetailsSlice from "./slices//ingredient-details-slice";
import burgerIngredientsSlice from "./slices/burger-ingredients-slice";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import orderDetailsSlice from "./slices/order-details-slice";
import userSlice from "./slices/user-slice";

const rootReducer = combineSlices(
  burgerIngredientsSlice,
  burgerConstructorSlice,
  ingredientDetailsSlice,
  orderDetailsSlice,
  userSlice,
);

const preloadedState = {
  burgerIngredients: { data: null, isLoading: false, isError: false },
  burgerConstructor: { bun: null, ingredients: [] },
  ingredientDetails: { data: null },
  orderDetails: { data: null, isLoading: false, isError: false },
  user: { user: null, isAuthChecked: false },
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
});
