import { sign, verify } from "jsonwebtoken";

export const generateNewToken = (payload: object) => {
  return sign(payload, process.env.JWT_SECRET!, { expiresIn: "2d" });
};

export const verifyToken = (token: string) => {
  return verify(token, process.env.JWT_SECRET!);
};
