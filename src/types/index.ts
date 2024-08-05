export interface Ingredient {
  carbohydrates: number;
  image_mobile: string;
  type: IngredientType;
  image_large: string;
  calories: number;
  proteins: number;
  image: string;
  price: number;
  name: string;
  fat: number;
  _id: string;
  __v: number;
}

export interface Order {
  ingredients: Ingredients;
  createdAt: string;
  updatedAt: string;
  status: string;
  number: number;
  price: number;
  owner: Owner;
  name: string;
  _id: string;
}

export interface Owner extends User {
  createdAt: string;
  updatedAt: string;
}

export interface ArrayData {
  [name: string]: Array<string>;
}

export interface FormData {
  [name: string]: string;
}

export interface User {
  email: string;
  name: string;
}

export type ConstructorIngredients = Array<BurgerConstructorIngredient>;

export interface BurgerConstructorIngredient extends Ingredient {
  id: string;
}

export type BurgerConstructorItemType = "top" | "bottom";

export type IngredientType = "bun" | "sauce" | "main";

export type Ingredients = Array<Ingredient>;

export type ServerIngredientsResponse = ServerResponseGeneric<{
  data: Ingredients;
}>;

export type ServerMessageResponse = ServerResponseGeneric<{ message: string }>;

export type ServerRefreshResponse = ServerResponseGeneric<{
  refreshToken: string;
  accessToken: string;
}>;

export type ServerUserResponse = ServerRefreshResponse & { user: User };

export type ServerOrderResponse = ServerResponseGeneric<{
  name: string;
  order: Order;
}>;

export type ServerResponseGeneric<T> = ServerResponse & T;

export type HTTPMethods = "GET" | "POST" | "PATCH";

export type ServerResponse = { success: boolean };

export type RequestData = FormData | ArrayData;

export interface Options {
  headers: {
    "Content-Type"?: string;
    authorization?: string;
  };
  method?: HTTPMethods;
  body?: string;
}

export interface Store {
  burgerConstructor: BurgerConstructorStore;
  ingredientDetails: IngredientDetailsStore;
  burgerIngredients: BurgerIngredientStore;
  orderDetails: OrderDetailsStore;
  user: UserStore;
}

interface BurgerConstructorStore {
  bun: BurgerConstructorIngredient | null;
  ingredients: ConstructorIngredients;
}

interface UserStore {
  isAuthChecked: boolean;
  user: User | null;
}

interface BurgerIngredientStore {
  data: Ingredients | null;
  isLoading: boolean;
  isError: boolean;
}

interface IngredientDetailsStore {
  data: Ingredient | null;
}

interface OrderDetailsStore {
  data: ServerOrderResponse | null;
  isLoading: boolean;
  isError: boolean;
}
