import { jest, describe } from "@jest/globals";
import { paramsWithoutRating } from "./mocks";
import categoryRepositories from "../src/repositories/categoryRepositories";
import categoryServices from "../src/services/categoryServices";
import { Product } from "../src/types";
import format from "../src/utils/format";
import categoriesRepositories from "../src/repositories/categoriesRepositories";

describe("Category tests", () => {
  describe("getAllProductsFromCategory", () => {
    it("should return all products from given category", async (): Promise<void> => {
      jest
        .spyOn(categoriesRepositories, "selectCategoryIdByName")
        .mockResolvedValueOnce([{ id: 1 }]);
      jest
        .spyOn(categoryRepositories, "selectAllProductsFromCategory")
        .mockResolvedValueOnce([paramsWithoutRating, paramsWithoutRating]);
      const result: Product[] =
        await categoryServices.getAllProductsFromCategory(
          paramsWithoutRating.category!
        );

      const formatted: Product = format.formatProductForResponse({
        product: paramsWithoutRating,
      });

      expect(result).toMatchObject([formatted, formatted]);
    });
  });

  it(`should return "Category not found!" if category name does not exists in DB`, async (): Promise<void> => {
    jest
      .spyOn(categoriesRepositories, "selectCategoryIdByName")
      .mockResolvedValueOnce([]);
    jest
      .spyOn(categoryRepositories, "selectAllProductsFromCategory")
      .mockResolvedValueOnce([]);
    try {
      const result: Product[] =
        await categoryServices.getAllProductsFromCategory(
          paramsWithoutRating.category!
        );
      const formatted: Product = format.formatProductForResponse({
        product: paramsWithoutRating,
      });
    } catch (error: any) {
      expect(error.message).toBe("Category not found!");
    }
  });
});
