import { Schema, Model, model, Models, models } from "mongoose";

type Category = {
  categoryName: string;
};

const CategorySchema = new Schema<Category>(
  {
    categoryName: { type: String, required: true },
  },
  { timestamps: true }
);

export const cateGoryModel: Model<Category> =
  models.Category || model("Category", CategorySchema);
