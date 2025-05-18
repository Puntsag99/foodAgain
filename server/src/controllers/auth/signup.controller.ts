import { UserModel } from "../../models";
import {
  encryptHash,
  generateNewToken,
  sendUserVerificationLink,
} from "../../util";
import { Request, Response } from "express";

type UserBody = { email: string; password: string };

export const signupController = async (req: Request, res: Response) => {
  const { email, password } = req.body as UserBody;

  if (!email || !password) {
    res.status(400).send({ message: "Email or password baihgi bna" });
    return;
  }

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    res.status(400).send({ message: "User already exists" });
    return;
  }

  const hashedPassword = encryptHash(password);

  const user = await UserModel.create({
    email,
    password: hashedPassword,
  });

  const token = generateNewToken({ userId: user._id });

  await sendUserVerificationLink(
    `${req.protocol}://${req.get(
      "host"
    )}/auth/verify-user?token=${token}&type=signup`,
    email
  );

  res.status(201).send({ message: "Success" });
};
