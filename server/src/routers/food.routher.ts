import { Router } from "express";
import { UserRoleEnum } from "../models";
import {
  foodPatch,
  foodCreate,
  getAllfood,
  foodDelete,
  getFoodByCategory,
} from "../controllers";
import { authenticateUser, authorization } from "../middlewares";

export const foodRouther = Router();

foodRouther
  .post(
    "/food",
    authenticateUser,
    authorization(UserRoleEnum.ADMIN),
    foodCreate
  )
  .get("/food", getAllfood);

foodRouther
  .patch(
    "/food/:id",
    authenticateUser,
    authorization(UserRoleEnum.ADMIN),
    foodPatch
  )
  .delete(
    "/food",
    authenticateUser,
    authorization(UserRoleEnum.ADMIN),
    foodDelete
  );

foodRouther.get("/food/category/:categoryId", getFoodByCategory);
