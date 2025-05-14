import { Request, Response } from "express";
import { UserModel } from "../../models";
type UserBody = { email: string; password: string };

export const signupConroller = async (req: Request, res: Response) => {
  const { email, password } = req.body as UserBody;

  if (!email || !password) {
    res.status(400).send({ message: "Email or password baihgi bna" });
  }

  await UserModel.create({
    email,
    password,
  });

  res.status(201).send({ message: "Success" });
};
