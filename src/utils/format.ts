import categoriesRepositories from "../repositories/categoriesRepositories";
import { Product } from "../types";

const formatProductForDB = async (product: Product): Promise<Product> => {
  const { ...newProduct }: Product = product;

  let rating;
  if (newProduct.rating) {
    rating = newProduct.rating;
    delete newProduct.rating;
  }

  let categoryId;
  if (newProduct.category && !newProduct.category_id) {
    const category = await categoriesRepositories.selectCategoryIdByName(
      newProduct.category
    );
    if (category.length === 0) {
      throw new Error(`Category ${newProduct.category} does not exists`);
    }
    delete newProduct.category;
    categoryId = category[0].id;
  }

  if (newProduct.category_id) delete newProduct.category_id;

  return {
    ...newProduct,
    category_id: categoryId,
    ...rating,
  };
};

const formatProductForResponse = (obj: {
  product: Product;
  category?: string;
}): Product => {
  const { ...newProduct } = obj.product;
  let rating;

  if (newProduct.rate && newProduct.count) {
    rating = {
      rate: newProduct.rate,
      count: newProduct.count,
    };
    delete newProduct.rate;
    delete newProduct.count;
  }

  if (obj.category) {
    if (newProduct.category_id) {
      delete newProduct.category_id;
    }
    newProduct.category = obj.category;
  }

  return {
    ...newProduct,
    rating,
  };
};

export default {
  formatProductForDB,
  formatProductForResponse,
};
