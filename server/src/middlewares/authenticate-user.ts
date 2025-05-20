import { UserModel } from "../models";
import { verifyToken } from "../util";
import { Request, Response, NextFunction } from "express";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  const token = authorization?.split(" ")[1];

  if (!authorization) {
    res
      .status(400)
      .send({ message: "Unauthorized user. Authorization token is invalid" });
    return;
  }

  if (!token) {
    res.status(400).send({
      message: "Unauthorized user. Authorization token is missing.  ",
    });
    return;
  }

  const decodedToken = verifyToken(token) as { userId: string };

  if (!decodedToken || !decodedToken.userId) {
    res
      .status(400)
      .send({ message: "Unauthorized user. Bad request or token is invalid" });
    return;
  }

  const existinguser = await UserModel.findById(decodedToken.userId);

  if (!existinguser) {
    res.status(400).send({ message: "user not found" });
    return;
  }

  req.body.user = existinguser;

  next();
};
