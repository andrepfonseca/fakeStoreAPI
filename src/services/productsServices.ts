import productsRepositories from "../repositories/productsRepositories";
import categoriesRepositories from "../repositories/categoriesRepositories";
import { Product } from "../types";

const getAllProducts = async () => {
  try {
    const products = await productsRepositories.selectAllProducts();
    const formattedProduct: Product[] = products.map((product: Product) => {
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
    return formattedProduct;
  } catch (error: any) {
    return error.message ? { error: error.message } : error;
  }
};

const getProductById = async (id: number) => {
  try {
    const product = await productsRepositories.selectProductById(id);
    if (!product.length) {
      throw new Error("Product not found");
    }
    const formattedProduct: Product = {
      id,
      title: product[0].title,
      price: product[0].price,
      description: product[0].description,
      category: product[0].category,
      image: product[0].image,
      rating: {
        rate: product[0].rate,
        count: product[0].count,
      },
    };
    return formattedProduct;
  } catch (error: any) {
    return error.message ? { error: error.message } : error;
  }
};

const postProduct = async (productToInsert: Product) => {
  try {
    const { category, rating, ...data } = productToInsert;
    const categoryName = await categoriesRepositories.selectCategoryIdByName(
      category
    );
    const categoryId: number | undefined = categoryName[0].id;

    if (!categoryId) {
      throw new Error(`Category ${categoryName} does not exists`);
    }

    const product = {
      category_id: categoryId,
      ...rating,
      ...data,
    };
    const productId = await productsRepositories.insertProduct(product);

    const productWithId = {
      id: productId[0],
      category,
      ...data,
      rating,
    };
    return productWithId;
  } catch (error: any) {
    return error.message ? { error: error.message } : error;
  }
};

const putProduct = async (product: Product) => {
  try {
    const { category, rating, id, ...data } = product;

    const selectedCategory =
      await categoriesRepositories.selectCategoryIdByName(category);
    const categoryId: number | undefined = selectedCategory[0].id;

    if (!categoryId) {
      throw new Error(`Category ${category} does not exists`);
    }

    const productToInsert = {
      id,
      category_id: categoryId,
      ...data,
      ...rating,
    };
    const insertedProductId = await productsRepositories.updateProduct(
      productToInsert
    );

    if (!insertedProductId) throw new Error("Product does not exist");
    return product;
  } catch (error: any) {
    return error.message ? { error: error.message } : error;
  }
};

const removeProduct = async (id: number) => {
  try {
    const productId = productsRepositories.deleteProduct(id);
    if (!productId) throw new Error("Product does not exist");
    return productId;
  } catch (error: any) {
    return error.message ? { error: error.message } : error;
  }
};

export default {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  removeProduct,
};
