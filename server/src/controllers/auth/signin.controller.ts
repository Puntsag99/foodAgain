import { UserModel } from "../../models";
import { decryptHash, generateNewToken } from "../../util";
import { Request, Response } from "express";

type UserBody = { email: string; password: string };

export const signinController = async (req: Request, res: Response) => {
  const { email, password }: UserBody = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(400).send({ message: "Email not registered" });
    return;
  }

  if (!user.isVerified) {
    res.status(403).send({ message: "Please verify your email first" });
    return;
  }

  const isMatch = decryptHash(password, user.password);

  if (!isMatch) {
    res.status(400).send({ message: "Wrong password" });
    return;
  }

  const accessToken = generateNewToken({ userId: user._id });

  res
    .status(200)
    .json({ message: "Sign in successful", token: accessToken, user });
};
