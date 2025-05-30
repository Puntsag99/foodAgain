import { X, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const DishesInfo = () => {
  return (
    <div className="w-[427px] flex flex-col py-7 px-6 bg-white gap-y-3">
      <div className="flex justify-between">
        <p className="font-semibold text-lg">Dishes info</p>
        <Button className="w-9 h-9 rounded-full bg-[#F4F4F5] text-black ">
          <X />
        </Button>
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="flex justify-between">
          <p className="font-normal text-xs text-[#71717A]">Dish name </p>
          <Input className="w-[288px] h-9" />
        </div>

        <div className="flex justify-between">
          <p className="font-normal text-xs text-[#71717A]">Dish categoty </p>
          <Input className="w-[288px] h-9" />
        </div>
        <div className="flex justify-between">
          <p className="font-normal text-xs text-[#71717A]">ingredientss </p>
          <Input className="w-[288px] h-9" />
        </div>
        <div className="flex justify-between">
          <p className="font-normal text-xs text-[#71717A]">Price </p>
          <Input className="w-[288px] h-9" />
        </div>
        <div className="flex justify-between">
          <p className="font-normal text-xs text-[#71717A]">image </p>
          <Input className="w-[288px] h-9" />
        </div>
      </div>
      <div className="flex justify-between mt-9">
        <div className="border border-red-600 w-[48px] h-10 flex rounded-md justify-center items-center text-red-600">
          <Trash />
        </div>
        <Button className=" cursor-pointer bg-white text-black hover:bg-black hover:text-white">
          Save changes
        </Button>
      </div>
    </div>
  );
};
