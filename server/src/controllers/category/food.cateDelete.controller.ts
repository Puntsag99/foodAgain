import { Request, Response } from "express";
import { cateGoryModel } from "../../models";

export const cateGoryDeleted = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCate = await cateGoryModel.findByIdAndDelete(id);

    if (!deletedCate) {
      res.status(404).send({ message: "No category" });
      return;
    }

    res.status(200).send({ message: "Fodd Deleted successfully" });
    return;
  } catch (error) {
    res.status(500).send({
      message: "Something wrong",
      error: error instanceof Error ? error.message : "Access denied",
    });
  }
};
