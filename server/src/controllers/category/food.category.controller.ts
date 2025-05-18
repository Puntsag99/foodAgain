import { cateGoryModel } from "../../models";
import { Request, Response } from "express";

type Cate = { categoryName: string };

export const createCategory = async (req: Request, res: Response) => {
  const { categoryName } = req.body as Cate;

  if (!categoryName) {
    res.status(400).send({ message: "categaryName is none" });
    return;
  }

  const existingCate = await cateGoryModel.findOne({ categoryName });

  if (existingCate) {
    res.status(400).send({ message: "Category already exists" });
    return;
  }

  const newCategory = await cateGoryModel.create({ categoryName });
  res.status(201).send("Category successfully");
};
