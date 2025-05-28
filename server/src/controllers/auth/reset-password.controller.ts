import { UserModel } from "../../models";
import { Request, Response } from "express";
import { encryptHash, verifyToken } from "../../util";

type UserBody = { newPassword: string; confirmPassword: string; token: string };

export const ResetPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword, confirmPassword, token } = req.body as UserBody;

    if (!token) {
      res.status(400).json({ message: "Token is required" });
      return;
    }

    const decodedToken = verifyToken(token) as { userId: string };

    const user = await UserModel.findById(decodedToken.userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!newPassword || !confirmPassword) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    if (newPassword !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match" });
      return;
    }

    const hashedPassword = encryptHash(newPassword);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
    return;
  } catch (error) {
    console.error("Error in ResetPassword:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
