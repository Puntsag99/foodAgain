import { FoodOrderModel } from "../../models";
import { Request, Response } from "express";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const newOrder = await FoodOrderModel.create(body);

    res.status(201).send(newOrder);
  } catch (error) {
    res.status(500).send({
      message: "Something wrong",
      error: error instanceof Error ? error.message : "Access denied",
    });
  }
};
