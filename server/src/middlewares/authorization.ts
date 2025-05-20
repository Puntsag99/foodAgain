import { Request, Response, NextFunction } from "express";

export const authorization =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    try {
      if (roles.includes(user.role)) {
        next();
      } else {
        res.status(400).send({ message: "Erh ni hureggui bna" });
      }
    } catch (error) {
      res.status(500).send({
        message: "Something wrong",
        error: error instanceof Error ? error.message : "unkwown error",
      });
    }
  };
