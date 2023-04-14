import knex, { Knex } from "knex";
import config from "./knexfile";
import { ProductToReturn } from "./src/types";

const knexInstance: Knex = knex(config);

async function seedProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products: ProductToReturn[] = await response.json();

  for (const product of products) {
    const {
      title,
      price,
      description,
      image,
      category,
      rating,
    }: ProductToReturn = product;

    const categoryId = await knexInstance("categories")
      .select("id")
      .where("name", category)
      .first();

    if (!categoryId) {
      console.error(`Category not found: ${category}`);
      continue;
    }

    await knexInstance("products").insert({
      title,
      price,
      description,
      image,
      category_id: categoryId.id,
      rating,
    });
  }

  console.log(`Inserted ${products.length} products`);

  process.exit();
}

seedProducts();
