export type ServerResponse = {
  success: boolean;
};

export type ServerResponseGeneric<T> = ServerResponse & T;

export type ServerMessageResponse = ServerResponseGeneric<{
  message: string;
}>;

export type ServerRefreshResponse = ServerResponseGeneric<{
  refreshToken: string;
  accessToken: string;
}>;

export type ServerUserResponse = ServerRefreshResponse & {
  user: User;
};

export type ServerIngredientsResponse = ServerResponseGeneric<{
  data: Ingredients;
}>;

export type ServerOrderResponse = ServerResponseGeneric<{
  name: string;
  order: Order;
}>;

export type ServerOrdersResponse = ServerResponseGeneric<{
  name: string;
  orders: Orders;
}>;

export type HTTPMethods = "GET" | "POST" | "PATCH";

export interface Options {
  method?: HTTPMethods;
  body?: string;
  headers: {
    "Content-Type"?: string;
    authorization?: string;
  };
}

export type RequestData = FormData | ArrayData;

export interface Ingredient {
  _id: string;
  name: string;
  type: IngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export type Ingredients = Array<Ingredient>;

export interface BurgerConstructorIngredient extends Ingredient {
  id: string;
}

export type ConstructorIngredients = Array<BurgerConstructorIngredient>;

export interface IngredientWithAmount extends Ingredient {
  amount: number;
}

export type BurgerConstructorItemType = "top" | "bottom";

export type IngredientType = "bun" | "sauce" | "main";

export interface FormData {
  [name: string]: string;
}

export interface ArrayData {
  [name: string]: Array<string>;
}

export interface Order {
  ingredients: string[];
  _id: string;
  status: "done" | "pending" | "created";
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  owner?: Owner;
  price?: number;
}

export type Orders = Array<Order>;

export interface User {
  email: string;
  name: string;
}

export interface Owner extends User {
  createdAt: string;
  updatedAt: string;
}

export enum Statuses {
  done = "Выполнен",
  created = "Создан",
  pending = "Готовится",
  canceled = "Отменен",
}

export interface BurgerConstructorStore {
  bun: BurgerConstructorIngredient | null;
  ingredients: ConstructorIngredients;
}

export interface UserStore {
  user: User | null;
  isAuthChecked: boolean;
}

export interface BurgerIngredientStore {
  data: Ingredients | null;
  isLoading: boolean;
  isError: boolean;
}

export interface IngredientDetailsStore {
  data: Ingredient | null;
}

export interface OrderDetailsStore {
  data: Order | null;
  isLoading: boolean;
  isError: boolean;
}

export interface WebSocketStore {
  status: WebSocketStatus;
  orders: Orders;
  total: number;
  totalToday: number;
  error: string;
}
// выше store

export interface WSOrderResponse {
  success: boolean;
  orders: Orders;
  total: number;
  totalToday: number;
}

export enum WebSocketStatus {
  OPENING = "opening...",
  CLOSING = "closing...",
  ONLINE = "online",
  OFFLINE = "offline",
}
