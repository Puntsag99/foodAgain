import { cateGoryModel } from "../../models";
import { Request, Response } from "express";

type Cate = { categoryName: string };

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.body as Cate;

    if (!categoryName) {
      res.status(400).send({ message: "categoryName is none" });
      return;
    }

    const existingCate = await cateGoryModel.findOne({ categoryName });

    if (existingCate) {
      res.status(400).send({ message: "Category already exists" });
      return;
    }

    await cateGoryModel.create({ categoryName });
    res.status(201).json({ message: "Category created successfully" });
    return;
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
