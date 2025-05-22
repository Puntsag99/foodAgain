import { foodModel } from "../../models";
import { Request, Response } from "express";

export const getAllfood = async (req: Request, res: Response) => {
  try {
    const allFoods = await foodModel.find();

    if (allFoods.length === 0) {
      res.status(404).send({ message: " No foodIdfound found" });
      return;
    }

    res.status(200).send({ message: "Food found", data: allFoods });
  } catch (error) {
    res.status(500).send({
      message: "Something wrong",
      error: error instanceof Error ? error.message : "Access denied",
    });
  }
};
