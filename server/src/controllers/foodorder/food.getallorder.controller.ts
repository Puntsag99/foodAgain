import { Request, Response } from "express";
import { FoodOrderModel } from "../../models";

export const getAllOrdersController = async (req: Request, res: Response) => {
  try {
    const allOrders = await FoodOrderModel.find()
      .populate("user")
      .populate({ path: "foodOrderItems.food", model: "food" });

    const total = await FoodOrderModel.countDocuments();

    res.status(200).send({ allOrders, total });
    return;
  } catch (error) {
    res.status(500).send({
      message: "Something wrong",
      error: error instanceof Error ? error.message : "Access denied",
    });
  }
};
