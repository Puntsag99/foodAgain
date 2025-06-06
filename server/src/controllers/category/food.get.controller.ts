import { Request, Response } from "express";
import { cateGoryModel } from "../../models";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await cateGoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories", error);
    res.status(500).json({ message: "Internal server" });
  }
};
