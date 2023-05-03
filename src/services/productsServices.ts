import productsRepositories from "../repositories/productsRepositories";
import categoriesRepositories from "../repositories/categoriesRepositories";
import { Product } from "../types";

const getAllProducts = async ({ limit = 0, sort = "asc" }) => {
  const products = await productsRepositories.selectAllProducts();
  let formattedProduct: Product[] = products.map((product: Product) => {
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

  //Alterar utilizando imutabilidade
  if (limit != 0) {
    formattedProduct = formattedProduct.slice(0, limit);
  }
  if (sort === "desc") {
    formattedProduct.reverse();
  }

  return formattedProduct;
};

const getProductById = async (id: number) => {
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
};

const postProduct = async (productToInsert: Product) => {
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
};

const putProduct = async (product: Product) => {
  const { category, rating, id, ...data } = product;

  const selectedCategory = await categoriesRepositories.selectCategoryIdByName(
    category
  );
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
};

const removeProduct = async (id: number) => {
  const productId = await productsRepositories.deleteProduct(id);
  if (!productId) throw new Error("Product does not exist");
  return productId;
};

export default {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  removeProduct,
};
