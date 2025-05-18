import { Router } from "express";
import { createCategory } from "../controllers";

export const Catergoryrouther = Router();

Catergoryrouther.post("/food-category", createCategory);
