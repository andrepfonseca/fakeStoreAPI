import { NextFunction, Request, Response } from "express";
import { object, string, number } from "yup";

const productDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productData = req.body;
    const productSchema = object({
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
    await productSchema.validate(productData);
    next();
  } catch (error) {
    next(error);
  }
};

const idDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsData = { id: parseInt(req.params.id) };

    const paramsSchema = object({
      id: number()
        .typeError("O id deve ser um número")
        .required("Id é obrigatório"),
    });

    await paramsSchema.validate(paramsData);

    next();
  } catch (error) {
    next(error);
  }
};

const categoryDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryData = req.body;
    const categorySchema = object({
      name: string().required("O nome da categoria é obrigatório"),
    });
    await categorySchema.validate(categoryData);
    next();
  } catch (error) {
    next(error);
  }
};

export default {
  productDataValidator,
  idDataValidator,
  categoryDataValidator,
};
