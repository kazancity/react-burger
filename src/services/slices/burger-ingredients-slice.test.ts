import burgerIngredientsSlice, {
  initialState,
  getIngredients,
} from "./burger-ingredients-slice";
import { Ingredients } from "../../types";

const ingredients: Ingredients = [
  {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  },
];

describe("burgerIngredientsSlice", () => {
  it("should initialize correctly", () => {
    const state = burgerIngredientsSlice.reducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("getIngredients pending", () => {
    const action = { type: getIngredients.pending.type };
    const state = burgerIngredientsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: true, isError: false });
  });

  it("getIngredients fulfilled", () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: ingredients,
    };
    const state = burgerIngredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      data: ingredients,
    });
  });

  it("getIngredients rejected", () => {
    const action = { type: getIngredients.rejected.type };
    const state = burgerIngredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
      data: null,
    });
  });
});
