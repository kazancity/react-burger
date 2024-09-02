import { BurgerConstructorIngredient, Ingredient } from "../../types";
import burgerConstructorSlice, {
  initialState,
  addIngredient,
  removeIngredient,
  sortIngredients,
  clearBurgerConstructor,
  prepareIngredient,
} from "./burger-constructor-slice";

const constructorIngredientBun: BurgerConstructorIngredient = {
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
  id: "nanoid",
};

const constructorIngredientOne: BurgerConstructorIngredient = {
  _id: "643d69a5c3f7b9001cfa0941",
  name: "Биокотлета из марсианской Магнолии",
  type: "main",
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: "https://code.s3.yandex.net/react/code/meat-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
  __v: 0,
  id: "nanoid",
};

const constructorIngredientTwo: BurgerConstructorIngredient = {
  _id: "643d69a5c3f7b9001cfa0942",
  name: "Соус Spicy-X",
  type: "sauce",
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: "https://code.s3.yandex.net/react/code/sauce-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
  __v: 0,
  id: "nanoid",
};

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

describe("burgerConstructorSlice", () => {
  it("should initialize correctly", () => {
    const state = burgerConstructorSlice.reducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  describe("addIngredient", () => {
    it("should added a bun", () => {
      const action = {
        type: addIngredient.type,
        payload: constructorIngredientBun,
      };
      const state = burgerConstructorSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, bun: constructorIngredientBun });
    });

    it("should added a ingredient", () => {
      const action = {
        type: addIngredient.type,
        payload: constructorIngredientOne,
      };
      const state = burgerConstructorSlice.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        ingredients: [constructorIngredientOne],
      });
    });

    it("should prepare a ingredient with id from the ingredient", () => {
      const prep = prepareIngredient(ingredient);
      expect(prep.payload.id).toBeDefined();
    });
  });

  it("removeIngredient", () => {
    const action = {
      type: removeIngredient.type,
      payload: constructorIngredientOne,
    };
    const state = burgerConstructorSlice.reducer(
      { ...initialState, ingredients: [constructorIngredientOne] },
      action,
    );
    expect(state).toEqual({ ...initialState });
  });

  it("sortIngredients", () => {
    const action = {
      type: sortIngredients.type,
      payload: { fromIndex: 0, toIndex: 1 },
    };
    const state = burgerConstructorSlice.reducer(
      {
        ...initialState,
        ingredients: [constructorIngredientOne, constructorIngredientTwo],
      },
      action,
    );
    expect(state).toEqual({
      ...initialState,
      ingredients: [constructorIngredientTwo, constructorIngredientOne],
    });
  });

  it("clearBurgerConstructor", () => {
    const action = { type: clearBurgerConstructor.type };
    const state = burgerConstructorSlice.reducer(
      {
        ...initialState,
        bun: constructorIngredientBun,
        ingredients: [constructorIngredientOne, constructorIngredientTwo],
      },
      action,
    );
    expect(state).toEqual({ ...initialState });
  });
});
