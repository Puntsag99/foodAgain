import { foodModel } from "../../models";
import { Request, Response } from "express";

type food = {
  image: string;
  price: number;
  foodName: string;
  ingredients: string;
};

export const foodCreate = async (req: Request, res: Response) => {
  try {
    const { foodName, price, image, ingredients } = req.body as food;

    const foods = await foodModel.find().populate("category");
    res.status(200).json(foods);

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
      ingredients,
    });

    if (existingFood) {
      res.status(400).send({ message: "All filds alreadry exists" });
      return;
    }

    await foodModel.create({ foodName, price, image, ingredients });
    res.status(201).json("All fields created succesfully");
    return;
  } catch (error) {
    res.status(500).send({
      message: "Something wrong",
      error: error instanceof Error ? error.message : "Access denied",
    });
  }
};
