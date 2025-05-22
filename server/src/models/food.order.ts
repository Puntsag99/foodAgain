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

const FoodOrderitemSchema = new Schema({
  food: { type: Schema.Types.ObjectId, ref: "Food" },
  quantity: { type: Number, required: true },
});

const FoodOrderSchema = new Schema<foodOrderTypeSchema>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    totalPrice: { type: Number },
    foodOrderItems: [FoodOrderitemSchema],
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
