import { Request, Response, NextFunction } from "express";

export const authorization =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    console.log("user", user);

    try {
      if (roles.includes(user.role)) {
        next();
      } else {
        res.status(400).send({ message: "You arn't Admin!" });
      }
    } catch (error) {
      res.status(500).send({
        message: "Something wrong",
        error: error instanceof Error ? error.message : "Access denied",
      });
    }
  };
