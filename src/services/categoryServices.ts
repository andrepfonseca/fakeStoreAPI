import categoriesRepositories from "../repositories/categoriesRepositories";
import categoryRepositories from "../repositories/categoryRepositories";
import { Product } from "../types";
import format from "../utils/format";

const getAllProductsFromCategory = async (
  categoryName: string
): Promise<Product[]> => {
  const id: { id: number }[] =
    await categoriesRepositories.selectCategoryIdByName(categoryName);
  if (id.length === 0) {
    throw new Error(`Category not found!`);
  }

  const products: Product[] =
    await categoryRepositories.selectAllProductsFromCategory(id[0].id);

  const formattedProducts: Product[] = products.map((product) =>
    format.formatProductForResponse({ product })
  );

  return formattedProducts;
};

export default {
  getAllProductsFromCategory,
};
