import { Request, Response } from "express";
import { FoodOrderModel } from "../../models";

export const getUserOrdersController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const userOrders = await FoodOrderModel.find({ user: userId })
      .populate("user")
      .populate({ path: "foodOrderItems.food", model: "food" });

    res.status(200).json({ orders: userOrders });
    return;
  } catch (error) {
    res.status(500).send({
      message: "Something wrong",
      error: error instanceof Error ? error.message : "Access denied",
    });
  }
};
