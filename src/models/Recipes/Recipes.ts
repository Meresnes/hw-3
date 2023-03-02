export type RecipesItemsApi = {
  id: number;
  title: string;
  image: string;
  nutrition: { nutrients: [{ amount: number }]; ingredients: [{}] };
};
export type RecipesItemsModel = {
  id: number;
  title: string;
  image: string;
  calories: number;
  ingredients: [{}];
};

export const normalizeRecipesList = (
  from: RecipesItemsApi
): RecipesItemsModel => ({
  id: from.id,
  title: from.title,
  image: from.image,
  calories: from.nutrition.nutrients[0].amount,
  ingredients: from.nutrition.ingredients,
});
