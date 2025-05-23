import { Router } from "express";
import { createOrder, getAllOrdersController } from "../controllers";

export const foodOrderRouther = Router();

foodOrderRouther.route("/").post(createOrder).get(getAllOrdersController);
