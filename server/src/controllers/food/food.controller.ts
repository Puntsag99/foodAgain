import { foodModel } from "../../models";
import { Request, Response } from "express";

type food = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
};

export const foodCreate = async (req: Request, res: Response) => {
  try {
    const { foodName, price, image, ingredients } = req.body as food;
  } catch {}
};
