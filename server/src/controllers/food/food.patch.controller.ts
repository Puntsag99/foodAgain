import { foodModel } from "../../models";
import { Request, Response } from "express";

export const foodPatch = async (req: Request, res: Response) => {
  try {
    const { foodName, price, image, ingredients } = req.body;
    const { id } = req.params;

    const foodUpdated = await foodModel.findByIdAndUpdate(
      id,
      {
        price,
        image,
        foodName,
        ingredients,
      },
      { new: true }
    );

    if (!foodUpdated) {
      res.status(404).send({ message: " No foodIdfound found" });
      return;
    }

    res.status(200).send({ message: "Updated" });
    return;
  } catch (error) {
    res.status(500).send({
      message: "Something wrong",
      error: error instanceof Error ? error.message : "Access denied",
    });
  }
};
