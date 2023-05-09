import { NextFunction, Request, Response } from "express";
import { object, string, number, ObjectSchema } from "yup";

const productDataValidator = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { ...productData } = req.body;

    const productSchema: ObjectSchema<{
      title: string;
      price: number;
      description: string;
      category: string;
      image: string;
      rating: {
        rate: number;
        count: number;
      };
    }> = object({
      title: string().required("Título é obrigatório"),
      price: number().required("Preço é obrigatório"),
      description: string().required("Descrição é obrigatória"),
      category: string().required("Categoria é obrigatória"),
      image: string().required("Imagem é obrigatória"),
      rating: object({
        rate: number().required("Nota é obrigatória"),
        count: number().required("Contagem é obrigatória"),
      }).required("Avaliação é obrigatória"),
    });

    await productSchema.validate(productData, { strict: true });

    next();
  } catch (error) {
    next(error);
  }
};

const partialProductDataValidator = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { ...partialProductData } = req.body;

    const partialProductSchema = object({
      id: number().typeError("Id must be a number"),
      title: string().typeError("Title must be a string"),
      price: number().typeError("Price must be a number"),
      description: string().typeError("Description must be a string"),
      category: string().typeError("Category must be a string"),
      image: string().typeError("Image must be a string"),
      rating: object({
        rate: number().typeError("Rate must be a number"),
        count: number().typeError("Count must be a number"),
      }),
    });

    await partialProductSchema.validate(partialProductData, { strict: true });

    next();
  } catch (error) {
    next(error);
  }
};

const idDataValidator = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { ...paramsData } = { id: parseInt(req.params.id) };

    const paramsSchema: ObjectSchema<{
      id: number;
    }> = object({
      id: number()
        .typeError("O id deve ser um número")
        .required("Id é obrigatório"),
    });

    await paramsSchema.validate(paramsData, { strict: true });

    next();
  } catch (error) {
    next(error);
  }
};

const categoryDataValidator = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { ...categoryData } = req.body;

    const categorySchema: ObjectSchema<{
      name: string;
    }> = object({
      name: string().required("O nome da categoria é obrigatório"),
    });

    await categorySchema.validate(categoryData, { strict: true });

    next();
  } catch (error) {
    next(error);
  }
};

export default {
  productDataValidator,
  partialProductDataValidator,
  idDataValidator,
  categoryDataValidator,
};
