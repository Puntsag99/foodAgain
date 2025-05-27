import { UserModel } from "../../models";
import { Request, Response } from "express";
import { generateNewToken, sendUserVerificationLink } from "../../util";

type UserBody = { email: string };

export const resPasswordReq = async (req: Request, res: Response) => {
  try {
    const { email } = req.body as UserBody;
    const user = await UserModel.findOne({ email });

    if (!user) {
      res
        .status(200)
        .send({ message: "If this email exists, a reset link has been sent." });
      return;
    }

    const token = generateNewToken({ userId: user._id });

    await sendUserVerificationLink(
      `${req.protocol}://${req.get(
        "host"
      )}/auth/verify-user?token=${token}&type=reset`,
      email,
      "reset"
    );

    res.redirect(`${process.env.FRONTEND_ENDPOINT}/password`);
  } catch (error) {
    console.error("Error in resPasswordReq:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
