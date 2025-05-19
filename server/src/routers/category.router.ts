import { Router } from "express";
import { createCategory, getCategories, updateCategory } from "../controllers";

export const Catergoryrouther = Router();

Catergoryrouther.get("/food-category", getCategories);
Catergoryrouther.post("/food-category", createCategory);
Catergoryrouther.patch("/food-category/:id", updateCategory);
