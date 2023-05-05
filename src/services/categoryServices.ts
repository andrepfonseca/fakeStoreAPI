import categoriesRepositories from "../repositories/categoriesRepositories";
import categoryRepositories from "../repositories/categoryRepositories";
import format from "../utils/format";

const getAllProductsFromCategory = async (categoryName: string) => {
  const id = await categoriesRepositories.selectCategoryIdByName(categoryName);

  if (id.length === 0) {
    throw new Error(`Category not found!`);
  }

  const products = await categoryRepositories.selectAllProductsFromCategory(
    id[0].id
  );

  const formattedProducts = products.map((product) =>
    format.formatProductForResponse({ product })
  );

  return formattedProducts;
};

export default {
  getAllProductsFromCategory,
};
