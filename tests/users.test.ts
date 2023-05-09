import { jest, describe } from "@jest/globals";
import { userWithoutId } from "./mocks";
import { User } from "../src/types";
import usersRepositories from "../src/repositories/usersRepositories";
import usersServices from "../src/services/usersServices";
import hash from "../src/utils/hash";
import tokenGenerator from "../src/utils/token";

describe("Users tests", () => {
  describe("insertUser", () => {
    it("should return created user with id", async (): Promise<void> => {
      jest.spyOn(usersRepositories, "insertUser").mockResolvedValueOnce([1]);
      jest.spyOn(hash, "hash").mockResolvedValueOnce(userWithoutId.password);

      const result = await usersServices.postUser(userWithoutId);

      expect(result).toMatchObject({ ...userWithoutId, id: 1 });
    });

    it(`should return "Error creating user" when function dont return user id`, async (): Promise<void> => {
      jest.spyOn(usersRepositories, "insertUser").mockResolvedValueOnce([]);
      jest.spyOn(hash, "hash").mockResolvedValueOnce(userWithoutId.password);

      try {
        const result: User = await usersServices.postUser(userWithoutId);
      } catch (error: any) {
        expect(error.message).toBe("Error creating user");
      }
    });
  });

  describe("putUser", () => {
    it("should return updated user with id", async (): Promise<void> => {
      jest.spyOn(usersRepositories, "updateUser").mockResolvedValueOnce(1);

      const result: User = await usersServices.putUser({
        user: { ...userWithoutId },
        userId: 1,
      });

      expect(result).toMatchObject({ ...userWithoutId, id: 1 });
    });

    it(`should return "Failed to update user or user does not exist" when failed to update`, async (): Promise<void> => {
      jest.spyOn(usersRepositories, "updateUser").mockResolvedValueOnce(0);

      try {
        const result: User = await usersServices.putUser({
          user: { ...userWithoutId },
          userId: 1,
        });
      } catch (error: any) {
        expect(error.message).toBe(
          "Failed to update user or user does not exist"
        );
      }
    });
  });

  describe("loginUser", () => {
    const token = "asdaasdmiasd";
    it("should return token to valid user", async (): Promise<void> => {
      jest.spyOn(usersRepositories, "selectUserByEmail").mockResolvedValueOnce([
        {
          ...userWithoutId,
          id: 1,
          password:
            "$2b$10$SaN/Bru9WuQ/AP/vQQGUUeo7q2acN.PHLOLX/21xvsf6Zna8z3hny",
        },
      ]);

      jest.spyOn(tokenGenerator, "generateToken").mockReturnValueOnce(token);

      const result: { token: string } = await usersServices.loginUser({
        ...userWithoutId,
      });

      expect(result).toMatchObject({ token });
    });

    it(`should return "User not found" user email not found in DB`, async (): Promise<void> => {
      jest
        .spyOn(usersRepositories, "selectUserByEmail")
        .mockResolvedValueOnce([]);

      try {
        const result: { token: string } = await usersServices.loginUser({
          ...userWithoutId,
        });
      } catch (error: any) {
        expect(error.message).toBe("User not found");
      }
    });

    it(`should return "Could not generate token" when token was not generated`, async (): Promise<void> => {
      jest.spyOn(usersRepositories, "selectUserByEmail").mockResolvedValueOnce([
        {
          ...userWithoutId,
          id: 1,
        },
      ]);

      jest.spyOn(tokenGenerator, "generateToken").mockReturnValueOnce(token);
      try {
        const result: { token: string } = await usersServices.loginUser({
          ...userWithoutId,
        });
      } catch (error: any) {
        expect(error.message).toBe("Could not generate token");
      }
    });
  });
});
