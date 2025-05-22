import { foodModel } from "../../models";
import { Request, Response } from "express";

export const foodDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const deleteFood = await foodModel.findByIdAndDelete(id);

    if (!deleteFood) {
      res.status(404).send({ message: "No foodIdfound" });
      return;
    }

    res.status(200).send({ message: "Fodd Deleted successfully" });
    return;
  } catch (error) {
    res.status(500).send({
      message: "Something wrong",
      error: error instanceof Error ? error.message : "Access denied",
    });
  }
};
