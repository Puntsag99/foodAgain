import { Request, Response } from "express";
import { verifyToken } from "../../util";
import { UserModel } from "../../models";

export const verifyUserController = async (req: Request, res: Response) => {
  const token = req.query.token as string;
  const type = req.query.type as "signup" | "reset";

  const decodedToken = verifyToken(token) as { userId: string };

  await UserModel.findByIdAndUpdate(decodedToken.userId, {
    isVerified: true,
    ttl: Date.now() + 10 * 365 * 24 * 60 * 60 * 1000,
  });

  res.status(200).send({ message: "Successfully verified", token });
};
