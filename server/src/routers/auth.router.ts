import { Router } from "express";
import {
  signupController,
  signinController,
  resPasswordReq,
  verifyUserController,
} from "../controllers/auth";
import { UserRoleEnum } from "../models";
import { authenticateUser, authorization } from "../middlewares";

export const authRouter = Router();

authRouter.post("/sign-up", signupController);
authRouter.post("/sign-in", signinController);
authRouter.get("/verify-user", verifyUserController);
authRouter.post("/reset-password-request", resPasswordReq);
