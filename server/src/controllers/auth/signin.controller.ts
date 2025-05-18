import { UserModel } from "../../models";
import { decryptHash } from "../../util";
import { Request, Response } from "express";

type UserBody = { email: string; password: string };

export const signinController = async (req: Request, res: Response) => {
  const { email, password }: UserBody = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(400).send({ message: "Email not registered" });
    return;
  }

  const isMatch = decryptHash(password, user.password);

  if (!isMatch) {
    res.status(400).send({ message: "Wrong password" });
  }
  res.status(200).send({ message: "Sign in successful", user });
};
