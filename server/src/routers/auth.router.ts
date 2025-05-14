import { Router } from "express";
import { signupConroller } from "../controllers/auth";

export const authRouter = Router();

authRouter.post("/sign-up", signupConroller);
