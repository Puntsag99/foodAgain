import { UserModel } from "../../models";
import { Request, Response } from "express";
import { generateNewToken, sendUserVerificationLink } from "../../util";

type UserBody = { email: string };

export const resPasswordReq = async (req: Request, res: Response) => {
  const { email } = req.body as UserBody;

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(400).send({ message: "Email not Registered" });
    return;
  }

  const token = generateNewToken({ userId: user._id });

  await sendUserVerificationLink(
    `${req.protocol}://${req.get(
      "host"
    )}/auth/verify-user?token=${token}&type=reset`,
    email
  );

  res.status(200).send({ message: "Password reset link sent to email" });
};
