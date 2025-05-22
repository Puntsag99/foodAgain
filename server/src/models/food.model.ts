import { Schema, Model, model, models, Models } from "mongoose";

type foodSchemaType = {
  price: Number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  foodName: string;
  ingredients: string;
  category: Schema.Types.ObjectId[];
};

const foodSchema = new Schema<foodSchemaType>(
  {
    foodName: { type: String, required: true, default: "" },
    price: { type: Number, required: true },
    image: { type: String, required: true, default: "" },
    ingredients: { type: String, required: true, default: "" },
    category: [
      { type: Schema.Types.ObjectId, ref: "Category", required: true },
    ],
  },
  { timestamps: true }
);

export const foodModel: Model<foodSchemaType> =
  models["food"] || model("food", foodSchema);
