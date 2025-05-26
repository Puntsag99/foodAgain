import { Request, Response } from "express";
import { generateNewToken } from "../../util";

export const refreshUserController = async (req: Request, res: Response) => {
  const { _id } = req.body.user;

  const refreshToken = generateNewToken(_id);

  res.status(200).send({ refreshToken });
};
