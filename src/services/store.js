import orderDetailsSlice from "./slices/order-details-slice";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import ingredientDetailsSlice from "./slices/ingredient-details-slice";
import burgerIngredientsSlice from "./slices/burger-ingredients-slice";
import burgerConstructorSlice from "./slices/burger-сonstructor-slice";

const rootReducer = combineSlices(
  burgerIngredientsSlice,
  burgerConstructorSlice,
  ingredientDetailsSlice,
  orderDetailsSlice,
);

const preloadedState = {
  burgerIngredients: { data: null, isLoading: false, isError: false },
  burgerConstructor: { bun: null, ingredients: [] },
  ingredientDetails: { data: null },
  orderDetails: { data: null, isLoading: false, isError: false },
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
});
