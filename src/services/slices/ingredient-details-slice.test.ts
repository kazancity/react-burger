import ingredientDetailsSlice, {
  initialState,
  setData,
  resetData,
} from "./ingredient-details-slice";
import { Ingredient } from "../../types";

const ingredient: Ingredient = {
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
};

describe("ingredientDetailsSlice", () => {
  it("should initialize correctly", () => {
    const state = ingredientDetailsSlice.reducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("setData", () => {
    const action = { type: setData.type, payload: ingredient };
    const state = ingredientDetailsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, data: ingredient });
  });

  it("resetData", () => {
    const action = { type: resetData.type };
    const state = ingredientDetailsSlice.reducer(
      { ...initialState, data: ingredient },
      action,
    );
    expect(state).toEqual(initialState);
  });
});
