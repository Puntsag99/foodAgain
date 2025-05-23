import { Router } from "express";
import {
  createOrder,
  updateOrderStatus,
  getAllOrdersController,
  getUserOrdersController,
} from "../controllers";

export const foodOrderRouther = Router();

foodOrderRouther.get("/:userId", getUserOrdersController);
foodOrderRouther.patch("/:foodOrderId", updateOrderStatus);
foodOrderRouther.route("/").post(createOrder).get(getAllOrdersController);
