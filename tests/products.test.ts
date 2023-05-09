import { jest, describe } from "@jest/globals";
import productsServices from "../src/services/productsServices";
import productsRepositories from "../src/repositories/productsRepositories";
import { Product } from "../src/types";
import { params, paramsPartial, paramsWithoutRating } from "./mocks";
import format from "../src/utils/format";

describe("Product tests", () => {
  describe("getAllProducts", () => {
    it("should return an array with all products", async (): Promise<void> => {
      jest
        .spyOn(productsRepositories, "selectAllProducts")
        .mockResolvedValueOnce([paramsWithoutRating, paramsWithoutRating]);
      const result: Product[] = await productsServices.getAllProducts({});
      const formatted: Product[] = result.map(() =>
        format.formatProductForResponse({
          product: paramsWithoutRating,
        })
      );

      expect(result).toMatchObject(formatted);
    });

    it("should return a reversed array with all products", async (): Promise<void> => {
      jest
        .spyOn(productsRepositories, "selectAllProducts")
        .mockResolvedValueOnce([paramsWithoutRating, paramsWithoutRating]);
      const result: Product[] = await productsServices.getAllProducts({
        sort: "desc",
      });
      let formatted: Product[] = result.map(() =>
        format.formatProductForResponse({
          product: paramsWithoutRating,
        })
      );
      formatted.reverse();

      expect(result).toMatchObject(formatted);
    });

    it("should return a limited array with products", async (): Promise<void> => {
      jest
        .spyOn(productsRepositories, "selectAllProducts")
        .mockResolvedValueOnce([paramsWithoutRating, paramsWithoutRating]);
      const limit = 1;
      const result: Product[] = await productsServices.getAllProducts({
        limit,
      });
      let formatted: Product[] = result.map(() =>
        format.formatProductForResponse({
          product: paramsWithoutRating,
        })
      );
      formatted.slice(0, limit);

      expect(result).toMatchObject(formatted);
    });
  });

  describe("getProductById", () => {
    it("should return a single product", async (): Promise<void> => {
      jest
        .spyOn(productsRepositories, "selectProductById")
        .mockResolvedValueOnce([paramsWithoutRating]);
      const result: Product = await productsServices.getProductById(1);

      expect(result).toMatchObject(
        format.formatProductForResponse({ product: paramsWithoutRating })
      );
    });
    it(`should return "Product not found" when id does not exists in DB`, async (): Promise<void> => {
      jest
        .spyOn(productsRepositories, "selectProductById")
        .mockResolvedValueOnce([]);
      try {
        const result: Product = await productsServices.getProductById(1);
      } catch (error: any) {
        expect(error.message).toBe("Product not found");
      }
    });
  });

  describe("postProduct", () => {
    it("should return the created product with id", async (): Promise<void> => {
      jest
        .spyOn(productsRepositories, "insertProduct")
        .mockResolvedValueOnce([1]);
      const result: Product = await productsServices.postProduct(params);

      expect(result).toMatchObject({ ...params, id: 1 });
    });
    it(`should return "Could not create product" when insert fails`, async (): Promise<void> => {
      jest
        .spyOn(productsRepositories, "insertProduct")
        .mockResolvedValueOnce([]);

      try {
        const result: Product = await productsServices.postProduct(params);
      } catch (error: any) {
        expect(error.message).toBe("Could not create product");
      }
    });
  });

  describe("putProduct", () => {
    it("should return the updated product", async (): Promise<void> => {
      jest
        .spyOn(productsRepositories, "updateProduct")
        .mockResolvedValueOnce(1);
      const result: Product = await productsServices.putProduct({
        id: 1,
        product: params,
      });

      expect(result).toMatchObject({ ...params, id: 1 });
    });

    it(`should return "Failed to update product or product does not exist" when cant update`, async (): Promise<void> => {
      jest
        .spyOn(productsRepositories, "updateProduct")
        .mockResolvedValueOnce(0);
      try {
        const result: Product = await productsServices.putProduct({
          id: 1,
          product: params,
        });
      } catch (error: any) {
        expect(error.message).toBe(
          "Failed to update product or product does not exist"
        );
      }
    });
  });

  describe("patchProduct", () => {
    it("should return the patched product", async (): Promise<void> => {
      jest
        .spyOn(productsRepositories, "updateProduct")
        .mockResolvedValueOnce(1);
      jest
        .spyOn(productsRepositories, "selectProductById")
        .mockResolvedValueOnce([paramsWithoutRating]);

      const result: Product = await productsServices.patchProduct({
        id: 1,
        partialProduct: paramsPartial,
      });

      expect(result).toMatchObject(
        format.formatProductForResponse({ product: paramsWithoutRating })
      );
    });

    it(`should return "Product not found" when cant find product with given id`, async (): Promise<void> => {
      jest
        .spyOn(productsRepositories, "updateProduct")
        .mockResolvedValueOnce(1);
      jest
        .spyOn(productsRepositories, "selectProductById")
        .mockResolvedValueOnce([]);

      try {
        const result: Product = await productsServices.patchProduct({
          id: 1,
          partialProduct: paramsPartial,
        });
      } catch (error: any) {
        expect(error.message).toBe("Product not found");
      }
    });

    it(`should return "Could not update product" when cant update`, async (): Promise<void> => {
      jest
        .spyOn(productsRepositories, "updateProduct")
        .mockResolvedValueOnce(0);
      jest
        .spyOn(productsRepositories, "selectProductById")
        .mockResolvedValueOnce([]);

      try {
        const result: Product = await productsServices.patchProduct({
          id: 1,
          partialProduct: paramsPartial,
        });
      } catch (error: any) {
        expect(error.message).toBe("Could not update product");
      }
    });

    it(`should return Id from request (1) is different from id sent in the body (2)`, async (): Promise<void> => {
      const formattedParams: Product = { ...paramsPartial, id: 2 };

      try {
        const result: Product = await productsServices.patchProduct({
          id: 1,
          partialProduct: formattedParams,
        });
      } catch (error: any) {
        expect(error.message).toBe(
          "Id from request (1) is different from id sent in the body (2)"
        );
      }
    });
  });

  describe("removeProduct", () => {
    it("should return the id from the removed product", async (): Promise<void> => {
      jest
        .spyOn(productsRepositories, "deleteProduct")
        .mockResolvedValueOnce(1);

      const result: number = await productsServices.removeProduct(1);

      expect(result).toBe(1);
    });
    it(`should return "Product does not exist" when id not found in DB`, async (): Promise<void> => {
      jest
        .spyOn(productsRepositories, "deleteProduct")
        .mockResolvedValueOnce(0);
      try {
        const result: number = await productsServices.removeProduct(1);
      } catch (error: any) {
        expect(error.message).toBe("Product does not exist");
      }
    });
  });
});
