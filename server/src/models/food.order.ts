import { Schema, model, models, Model, Models } from "mongoose";

export enum FoodOrderStatusEnum {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DELIVERED = "DELIVERED",
}

type FoodOrderItemType = {
  food: Schema.Types.ObjectId;
  quantity: number;
};

type foodOrderTypeSchema = {
  totalPrice: number;
  foodOrderItems: FoodOrderItemType[];
  status: FoodOrderStatusEnum;
  user: Schema.Types.ObjectId;
};

const FoodOrderitemSchema = new Schema(
  {
    food: { type: Schema.Types.ObjectId, required: true, ref: "food" },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const FoodOrderSchema = new Schema<foodOrderTypeSchema>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalPrice: { type: Number, required: true },
    foodOrderItems: { type: [FoodOrderitemSchema], required: true },
    status: {
      type: String,
      enum: Object.values(FoodOrderStatusEnum),
      default: FoodOrderStatusEnum.PENDING,
    },
  },
  { timestamps: true }
);

export const FoodOrderModel: Model<foodOrderTypeSchema> =
  models.foodOrder || model("foodOrder", FoodOrderSchema);
