import { Request, Response } from "express";
import { cateGoryModel } from "../../models";

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.body;
    const { id } = req.params;
    const updated = await cateGoryModel.findByIdAndUpdate(id, { categoryName });
    if (!updated) {
      res.status(404).send({ message: "Category not found" });
    }

    res.status(200).send({ message: "Updated" });
  } catch (err) {
    res.status(500).send({ message: "Error", error: err });
  }
};
