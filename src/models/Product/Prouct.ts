export type ProductItemsApi = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  instructions: string;
  healthScore: number;
  extendedIngredients: [{}];
};
export type ProductItemsModel = {
  id?: number;
  title?: string;
  image?: string;
  cookingTime?: number;
  descripton?: string;
  healthScore?: number;
  ingredients?: [{}];
};

export const normalizeProductList = (
  from: ProductItemsApi
): ProductItemsModel => ({
  id: from.id,
  title: from.title,
  image: from.image,
  cookingTime: from.readyInMinutes,
  descripton: from.instructions,
  healthScore: from.healthScore,
  ingredients: from.extendedIngredients,
});
