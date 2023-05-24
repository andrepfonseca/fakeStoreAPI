import productsRepositories from "../repositories/productsRepositories";
import { Product } from "../types";
import format from "../utils/format";

const getAllProducts = async ({
  limit = 0,
  sort = "asc",
}): Promise<Product[]> => {
  const products: Product[] = await productsRepositories.selectAllProducts();
  let formattedProduct: Product[] = products.map((product: Product) =>
    format.formatProductForResponse({ product })
  );

  if (limit != 0) formattedProduct = formattedProduct.slice(0, limit);
  if (sort === "desc") formattedProduct.reverse();

  return formattedProduct;
};

const getBestSellingProducts = async (): Promise<Product[]> => {
  const products: Product[] = await productsRepositories.selectAllProducts();
  const formattedProduct: Product[] = products.map((product: Product) =>
    format.formatProductForResponse({ product })
  );
  formattedProduct.sort((a, b) => {
    const countA = a.rating && a.rating.count ? a.rating.count : -Infinity;
    const countB = b.rating && b.rating.count ? b.rating.count : -Infinity;
    return countB - countA;
  });
  const top3Products: Product[] = formattedProduct.slice(0, 3);

  return top3Products;
};

const getProductById = async (id: number): Promise<Product> => {
  const product: Product[] = await productsRepositories.selectProductById(id);
  if (!product.length) {
    throw new Error("Product not found");
  }

  return format.formatProductForResponse({ product: product[0] });
};

const postProduct = async (product: Product): Promise<Product> => {
  const formattedProduct: Product = await format.formatProductForDB(product);

  const productId: number[] = await productsRepositories.insertProduct(
    formattedProduct
  );
  if (productId.length === 0) throw new Error("Could not create product");
  formattedProduct.id = productId[0];

  return format.formatProductForResponse({
    product: formattedProduct,
    category: product.category,
  });
};

const putProduct = async (productObject: {
  id: number;
  product: Product;
}): Promise<Product> => {
  const { id, product }: { id: number; product: Product } = productObject;

  const formattedProduct: Product = await format.formatProductForDB(product);
  formattedProduct.id = id;

  const updatedProduct: number = await productsRepositories.updateProduct(
    formattedProduct
  );
  if (!updatedProduct)
    throw new Error("Failed to update product or product does not exist");

  return format.formatProductForResponse({
    product: formattedProduct,
    category: product.category,
  });
};

const patchProduct = async (productObject: {
  id: number;
  partialProduct: Product;
}): Promise<Product> => {
  const { id, partialProduct }: { id: number; partialProduct: Product } =
    productObject;
  const partialProductFormatted: Product = await format.formatProductForDB(
    partialProduct
  );

  if (partialProductFormatted.id && partialProductFormatted.id !== id)
    throw new Error(
      `Id from request (${id}) is different from id sent in the body (${partialProductFormatted.id})`
    );
  partialProductFormatted.id = id;

  const hasProductUpdated: number = await productsRepositories.updateProduct(
    partialProductFormatted
  );
  if (!hasProductUpdated) throw new Error("Could not update product");

  const patchedProduct: Product[] =
    await productsRepositories.selectProductById(id);
  if (patchedProduct.length === 0) throw new Error("Product not found");

  return format.formatProductForResponse({
    product: patchedProduct[0],
  });
};

const removeProduct = async (id: number): Promise<number> => {
  const productId: number = await productsRepositories.deleteProduct(id);
  if (!productId) throw new Error("Product does not exist");

  return productId;
};

export default {
  getAllProducts,
  getBestSellingProducts,
  getProductById,
  postProduct,
  putProduct,
  patchProduct,
  removeProduct,
};
