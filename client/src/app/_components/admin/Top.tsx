"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { DishesInfo } from "./DishesInfo";
import { AddDish } from "./AddDish";
import { Button } from "@/components/ui/button";
import axios from "axios";

export const Top = () => {
  const [dishInfo, setDishInfo] = useState(false);

  const handleDishAdd = () => {
    setDishInfo(true);
  };

  const handledishClose = () => {
    setDishInfo(false);
  };

  type Category = {
    // _id: string;
    foodName: string;
    price: number;
    ingredients: string;
    image: string;
  };

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/food");
        setCategories(res.data.data);
        console.log("hool bna uu:", res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <div className=" flex flex-col gap-y-4 bg-white p-5  grid-cols-4 grid-rows-2  ">
        <p className="font-semibold">Appetizers ({categories.length})</p>
        <div className="grid grid-cols-4  gap-4">
          <div className="border-dashed border rounded-2xl border-red-600 w-[270.75px] h-[241px]  flex justify-center items-center ">
            <div className="flex flex-col gap-y-6 items-center">
              <Button
                onClick={handleDishAdd}
                className="w-10 h-10 rounded-full bg-red-700 cursor-pointer"
              >
                <Plus />
              </Button>
              <p className="font-medium text-sm w-[154px] text-center">
                Add new Dish to Appetizers
              </p>
            </div>
          </div>
          {categories.slice(0, 7).map((dish, index) => (
            <div
              key={index}
              className="w-[270.75px] h-[241px] p-4 flex flex-col border border-[#E4E4E7] rounded-2xl gap-y-5"
            >
              <Image width={238.75} height={129} alt="fafa" src={dish.image} />
              <div className="flex flex-col gap-y-2">
                <div className="flex justify-between">
                  <p className="font-medium text-sm text-red-600">
                    {dish.foodName}
                  </p>
                  <p className="font-normal text-xs">{dish.price}</p>
                </div>
                <p className="font-normal text-xs">{dish.ingredients}</p>
              </div>
            </div>
          ))}
        </div>
        {dishInfo && (
          <div className=" z-50 absolute left-200 ">
            <AddDish onClose={handledishClose} />
          </div>
        )}
      </div>
    </div>
  );
};
