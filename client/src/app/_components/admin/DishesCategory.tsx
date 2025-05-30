"use client";

import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Category = {
  _id: string;
  categoryName: string;
};

export const DishesCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/Food-category");
        setCategories(res.data);
        console.log("Categories data:", res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow flex flex-col gap-x-4 ">
      <h2 className="text-xl font-semibold mb-4">Dishes category</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <Button
            key={cat._id}
            className="bg-white text-black hover:bg-black hover:text-white"
          >
            <span>{cat.categoryName}</span>
            <Badge className="">15</Badge>
          </Button>
        ))}
        <Button className="w-8 h-8 cursor-pointer rounded-full bg-red-500 text-white flex items-center justify-center">
          <Plus className="w-4 h-4 " />
        </Button>
      </div>
    </div>
  );
};
