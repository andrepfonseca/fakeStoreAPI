import { jest, describe } from "@jest/globals";
import categoriesRepositories from "../src/repositories/categoriesRepositories";
import { categoriesParams } from "./mocks";
import { Category } from "../src/types";
import categoriesServices from "../src/services/categoriesServices";

describe("Categories tests", () => {
  describe("getCategoriesNames", () => {
    it("should return an array containing all categories names", async (): Promise<void> => {
      jest
        .spyOn(categoriesRepositories, "selectAllCategoriesNames")
        .mockResolvedValueOnce([categoriesParams]);
      const result: string[] = await categoriesServices.getCategoriesNames();
      expect(result).toMatchObject([categoriesParams.name]);
    });

    it(`should return "Categories not found" when no categories found`, async (): Promise<void> => {
      jest
        .spyOn(categoriesRepositories, "selectAllCategoriesNames")
        .mockResolvedValueOnce([]);
      try {
        const result: string[] = await categoriesServices.getCategoriesNames();
      } catch (error: any) {
        expect(error.message).toBe("Categories not found");
      }
    });
  });

  describe("getCategoryById", () => {
    it("should return the category of the given id", async (): Promise<void> => {
      jest
        .spyOn(categoriesRepositories, "selectCategoryById")
        .mockResolvedValueOnce([{ ...categoriesParams, id: 1 }]);
      const result: Category = await categoriesServices.getCategoryById(1);
      expect(result).toMatchObject({ ...categoriesParams, id: 1 });
    });

    it(`should return "Category not found" when id does not exists in DB`, async (): Promise<void> => {
      jest
        .spyOn(categoriesRepositories, "selectCategoryById")
        .mockResolvedValueOnce([]);
      try {
        const result: Category = await categoriesServices.getCategoryById(1);
      } catch (error: any) {
        expect(error.message).toBe("Category not found");
      }
    });
  });

  describe("createCategory", () => {
    it("should return the created category with id", async (): Promise<void> => {
      jest
        .spyOn(categoriesRepositories, "selectCategoryByName")
        .mockResolvedValueOnce([]);
      jest
        .spyOn(categoriesRepositories, "insertCategory")
        .mockResolvedValueOnce([1]);
      const result: Category = await categoriesServices.createCategory(
        categoriesParams.name
      );
      expect(result).toMatchObject({ ...categoriesParams, id: 1 });
    });

    it(`should return "Category already exists" name already exists`, async (): Promise<void> => {
      jest
        .spyOn(categoriesRepositories, "selectCategoryByName")
        .mockResolvedValueOnce([{ id: 1, name: categoriesParams.name }]);
      jest
        .spyOn(categoriesRepositories, "insertCategory")
        .mockResolvedValueOnce([]);
      try {
        const result: Category = await categoriesServices.createCategory(
          categoriesParams.name
        );
      } catch (error: any) {
        expect(error.message).toBe("Category already exists");
      }
    });
  });
  describe("putCategory", () => {
    it("should return the updated category with id", async (): Promise<void> => {
      jest
        .spyOn(categoriesRepositories, "selectCategoryByName")
        .mockResolvedValueOnce([]);
      jest
        .spyOn(categoriesRepositories, "updateCategory")
        .mockResolvedValueOnce(1);
      const result: Category = await categoriesServices.putCategory({
        name: categoriesParams.name,
        id: 1,
      });
      expect(result).toMatchObject({ ...categoriesParams, id: 1 });
    });

    it(`should return "Could not update category" when update fails`, async (): Promise<void> => {
      jest
        .spyOn(categoriesRepositories, "selectCategoryByName")
        .mockResolvedValueOnce([]);
      jest
        .spyOn(categoriesRepositories, "updateCategory")
        .mockResolvedValueOnce(0);
      try {
        const result: Category = await categoriesServices.putCategory({
          name: categoriesParams.name,
          id: 1,
        });
      } catch (error: any) {
        expect(error.message).toBe("Could not update category");
      }
    });
    it(`should return "Category name already exists" when category name exists on DB`, async (): Promise<void> => {
      jest
        .spyOn(categoriesRepositories, "selectCategoryByName")
        .mockResolvedValueOnce([
          { id: categoriesParams.id!, name: categoriesParams.name },
        ]);
      jest
        .spyOn(categoriesRepositories, "updateCategory")
        .mockResolvedValueOnce(0);
      try {
        const result: Category = await categoriesServices.putCategory({
          name: categoriesParams.name,
          id: 1,
        });
      } catch (error: any) {
        expect(error.message).toBe("Category name already exists");
      }
    });
  });

  describe("removeCategory", () => {
    it("should return success message", async (): Promise<void> => {
      jest
        .spyOn(categoriesRepositories, "deleteCategory")
        .mockResolvedValueOnce(1);
      const result: { message: string } =
        await categoriesServices.removeCategory(1);

      expect(result.message).toBe("Category deleted");
    });
    it(`should return "Category does not exist" when given id does not exist in DB`, async (): Promise<void> => {
      jest
        .spyOn(categoriesRepositories, "deleteCategory")
        .mockResolvedValueOnce(0);

      try {
        const result: { message: string } =
          await categoriesServices.removeCategory(1);
      } catch (error: any) {
        expect(error.message).toBe("Category does not exist");
      }
    });
  });
});
