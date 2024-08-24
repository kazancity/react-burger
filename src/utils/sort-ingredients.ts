import { Ingredients, IngredientWithAmount } from "../types";

export const getUniqIngredientsWithAmount = (
  ingredientsId: Array<string>,
  ingredients: Ingredients | null,
) => {
  const uniqueIngredientsId = ingredientsId.filter(
    (item, pos) => ingredientsId.indexOf(item) === pos,
  );

  return uniqueIngredientsId.map(
    (ingredientId) =>
      ({
        ...ingredients?.find((ingredient) => ingredient._id === ingredientId),
        amount: ingredientsId.filter((id) => id === ingredientId).length,
      }) as IngredientWithAmount,
  );
};
