import { Request, Response } from "express";
import { FoodOrderModel } from "../../models";

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { foodOrderId } = req.params;
    const { status } = req.body;

    if (!status) {
      res.status(400).json({ message: "Status is required" });
      return;
    }

    const updatedOrder = await FoodOrderModel.findByIdAndUpdate(
      foodOrderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).send({
      message: "Something wrong",
      error: error instanceof Error ? error.message : "Access denied",
    });
  }
};
