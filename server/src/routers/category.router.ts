import { Router } from "express";
import { UserRoleEnum } from "../models";
import { authenticateUser, authorization } from "../middlewares";
import {
  createCategory,
  getCategories,
  updateCategory,
  cateGoryDeleted,
} from "../controllers";

export const Catergoryrouther = Router();

Catergoryrouther.get("/food-category", getCategories);

Catergoryrouther.post(
  "/food-category",
  authenticateUser,
  authorization(UserRoleEnum.ADMIN),
  createCategory
);
Catergoryrouther.patch(
  "/food-category/:id",
  authenticateUser,
  authorization(UserRoleEnum.ADMIN),
  updateCategory
).delete(
  "/food-category/:id",
  authenticateUser,
  authorization(UserRoleEnum.ADMIN),
  cateGoryDeleted
);
