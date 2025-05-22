import { foodModel } from "../../models";
import { Request, Response } from "express";

export const getFoodByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const categoryFood = await foodModel.find({ category: categoryId });

    if (!categoryFood || categoryFood.length === 0) {
      res.status(404).send({ message: "No food found in this category" });
      return;
    }
    res.status(200).send({ message: "Food Found", data: categoryFood });
    return;
  } catch (error) {
    res.status(500).send({
      message: "Something wrong",
      error: error instanceof Error ? error.message : "Access denied",
    });
  }
};
