import categoriesRepositories from "../repositories/categoriesRepositories";
import { Category } from "../types";

const getCategoriesNames = async (): Promise<string[]> => {
  const categories = await categoriesRepositories.selectAllCategoriesNames();
  if (categories.length === 0) throw new Error("Categories not found");
  const categoriesArray = categories.map((category: Category) => category.name);
  return categoriesArray;
};

const getCategoryById = async (
  id: number
): Promise<{ id: number; category: string }> => {
  const category = await categoriesRepositories.selectCategoryById(id);
  if (!category.length) {
    throw new Error("Category not found");
  }
  return category[0];
};

const createCategory = async (
  name: string
): Promise<{ id: number; category: string }> => {
  const searchCategoryByName =
    await categoriesRepositories.selectCategoryByName(name);
  if (!searchCategoryByName.length) {
    const createdCategoryId = await categoriesRepositories.insertCategory(name);
    return { id: createdCategoryId[0], category: name };
  }
  throw new Error("Category already exists");
};

const putCategory = async (
  name: string,
  id: number
): Promise<{ id: number; category: string }> => {
  const searchCategoryByName =
    await categoriesRepositories.selectCategoryByName(name);
  if (!searchCategoryByName.length) {
    const updatedCategory = await categoriesRepositories.updateCategory(
      name,
      id
    );
    if (!updatedCategory) throw new Error("Could not update category");
    return { id, category: name };
  }
  throw new Error("Category name already exists");
};

const removeCategory = async (id: number): Promise<{ message: string }> => {
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
