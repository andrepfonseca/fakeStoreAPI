import categoriesRepositories from "../repositories/categoriesRepositories";
import categoryRepositories from "../repositories/categoryRepositories";

const getAllProductsFromCategory = async (categoryName: string) => {
  const id = await categoriesRepositories.selectCategoryIdByName(categoryName);

  if (id.length === 0) {
    throw new Error(`Category not found!`);
  }

  const products = await categoryRepositories.selectAllProductsFromCategory(
    id[0].id
  );

  const formattedProducts = products.map((product) => {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: {
        rate: product.rate,
        count: product.count,
      },
    };
  });

  return formattedProducts;
};

export default {
  getAllProductsFromCategory,
};
