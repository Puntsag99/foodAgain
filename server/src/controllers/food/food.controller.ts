import { foodModel } from "../../models";
import { Request, Response } from "express";

type food = {
  image: string;
  price: number;
  foodName: string;
  category: string[];
  ingredients: string;
};

export const foodCreate = async (req: Request, res: Response) => {
  try {
    const { foodName, price, image, ingredients, category } = req.body as food;

    if (!foodName || !price || !image || !ingredients) {
      res.status(400).send({
        message: "All fielfs are required:foodName,price,image,ingredients",
      });
      return;
    }

    const existingFood = await foodModel.findOne({
      image,
      price,
      foodName,
      category,
      ingredients,
    });

    if (existingFood) {
      res.status(400).send({ message: "All filds alreadry exists" });
      return;
    }

    const newFood = await foodModel.create({
      price,
      image,
      foodName,
      category,
      ingredients,
    });

    const populatedFood = await foodModel
      .findById(newFood._id)
      .populate("category");

    res.status(201).json(populatedFood);
    return;
  } catch (error) {
    res.status(500).send({
      message: "Something wrong",
      error: error instanceof Error ? error.message : "Access denied",
    });
  }
};
