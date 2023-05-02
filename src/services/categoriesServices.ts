import categoriesRepositories from "../repositories/categoriesRepositories";
import { Category } from "../types";

const getCategoriesNames = async () => {
  const categories: Category[] =
    await categoriesRepositories.selectAllCategoriesNames();
  const categoriesArray = categories.map((category: Category) => category.name);
  return categoriesArray;
};

const getCategoryById = async (id: number) => {
  const category = await categoriesRepositories.selectCategoryById(id);
  if (!category.length) {
    throw new Error("Category not found");
  }
  return category[0];
};

const createCategory = async (name: string) => {
  const searchCategoryByName =
    await categoriesRepositories.selectCategoryByName(name);
  if (!searchCategoryByName.length) {
    const createdCategoryId = await categoriesRepositories.insertCategory(name);
    return { id: createdCategoryId[0], name };
  }
  throw new Error("Category already exists");
};

const putCategory = async (name: string, id: number) => {
  const searchCategoryByName =
    await categoriesRepositories.selectCategoryByName(name);
  if (!searchCategoryByName.length) {
    const updatedCategory = await categoriesRepositories.updateCategory(
      name,
      id
    );
    if (!updatedCategory) throw new Error("Could not update category");
    return { id, name };
  }
  throw new Error("Category name already exists");
};

const removeCategory = async (id: number) => {
  const deletedCategory = await categoriesRepositories.deleteCategory(id);
  if (!deletedCategory) throw new Error("Category does not exist");
  return { message: "Category deleted" };
};

export default {
  getCategoriesNames,
  getCategoryById,
  createCategory,
  putCategory,
  removeCategory,
};
