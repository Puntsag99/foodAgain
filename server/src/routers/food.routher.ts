import { Router } from "express";
import { foodCreate } from "../controllers";

export const foodRouther = Router();

foodRouther.post("/food", foodCreate);
