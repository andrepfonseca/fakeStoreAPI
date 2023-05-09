import categoriesRepositories from "../repositories/categoriesRepositories";
import { Category } from "../types";

const getCategoriesNames = async (): Promise<string[]> => {
  const categories: Category[] =
    await categoriesRepositories.selectAllCategoriesNames();
  if (categories.length === 0) throw new Error("Categories not found");

  const categoriesArray: string[] = categories.map(
    (category: Category) => category.name
  );

  return categoriesArray;
};

const getCategoryById = async (id: number): Promise<Category> => {
  const category: { id: number; name: string }[] =
    await categoriesRepositories.selectCategoryById(id);
  if (!category.length) {
    throw new Error("Category not found");
  }

  return category[0];
};

const createCategory = async (name: string): Promise<Category> => {
  const searchCategoryByName: Category[] =
    await categoriesRepositories.selectCategoryByName(name);

  if (!searchCategoryByName.length) {
    const createdCategoryId: number[] =
      await categoriesRepositories.insertCategory(name);
    return { id: createdCategoryId[0], name: name };
  }

  throw new Error("Category already exists");
};

const putCategory = async (category: Category): Promise<Category> => {
  const searchCategoryByName: Category[] =
    await categoriesRepositories.selectCategoryByName(category.name);
  if (!searchCategoryByName.length) {
    console.log(searchCategoryByName);
    const updatedCategory: number = await categoriesRepositories.updateCategory(
      category
    );
    if (!updatedCategory) throw new Error("Could not update category");

    return { id: category.id!, name: category.name };
  }

  throw new Error("Category name already exists");
};

const removeCategory = async (id: number): Promise<{ message: string }> => {
  const deletedCategory: number = await categoriesRepositories.deleteCategory(
    id
  );

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
