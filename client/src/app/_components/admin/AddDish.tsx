"use client ";

import { X, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";

export const AddDish = ({ onClose }: { onClose: () => void }) => {
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewLink, setPreviewLink] = useState<string | null>(null);

  //   console.log("yum bna uu", foodName);

  const handleChangeFoodname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFoodName(event.target.value);
  };

  const handleChangeFoodPrice = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFoodPrice(event.target.value);
  };

  const handleChangeFoodIngredients = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIngredients(event.target.value);
  };

  const inputImageRef = useRef<HTMLInputElement | null>(null);

  const openBrowse = async () => {
    inputImageRef.current?.click();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewLink(URL.createObjectURL(file));
    }
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please upload an image.");
      return;
    }

    const form = new FormData();
    form.append("upload_preset", "foodDeliver");
    form.append("file", selectedFile);

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxjdxefkk/image/upload",
        {
          method: "POST",
          body: form,
        }
      );
      const parsed = await response.json();
      const imageUrl = parsed.secure_url;

      await axios.post(
        "http://localhost:8000/api/food",
        {
          foodName,
          price: Number(foodPrice),
          ingredients,
          image: imageUrl,
          category: "682a75604eedd30a6ccc6b0d",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Амжилттай бүртгэгдлээ!");
      onClose();
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Алдаа гарлаа!");
    }
  };

  return (
    <div className="w-[460px] py-7 flex flex-col px-6 bg-white gap-y-6">
      <div className="flex justify-between">
        <p className="font-semibold text-lg">Add new Dish to Appetizers</p>
        <Button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-[#F4F4F5] text-black "
        >
          <X />
        </Button>
      </div>
      <div className="flex gap-x-6">
        <div className="flex flex-col gap-y-2">
          <p className="font-medium text-sm">Food name</p>
          <Input
            onChange={handleChangeFoodname}
            placeholder="Type Food name"
            className="w-[194px]"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="font-medium text-sm">Food price</p>
          <Input
            onChange={handleChangeFoodPrice}
            placeholder="Enter price..."
            className="w-[194px]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="font-medium text-sm">Ingredients</p>
        <Input
          onChange={handleChangeFoodIngredients}
          className="h-[90px]"
          placeholder="List ingredients..."
        />
      </div>

      <div className="flex flex-col gap-y-2">
        <p className="font-medium text-sm">Food image</p>
        <input
          type="file"
          ref={inputImageRef}
          className="hidden"
          multiple
          onChange={handleInputChange}
        />
        <div
          onClick={openBrowse}
          className="border border-dashed h-[138px] border-[#2563EB33] rounded-md bg-blue-200 flex flex-col gap-y-2 justify-center items-center"
        >
          <div className="w-[32px] h-[32px] rounded-full bg-white flex justify-center items-center">
            <Image width={12} height={12} alt="faf" src="/img/Fra.png" />
          </div>

          {previewLink ? (
            <Image
              width={100}
              height={100}
              alt="Preview"
              src={previewLink}
              className="object-cover rounded-md"
            />
          ) : (
            <span className="text-sm text-gray-500">
              Choose a file or drag & drop it here
            </span>
          )}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className=" bg-white text-black  hover:bg-black hover:text-white"
      >
        Add dish
      </Button>
    </div>
  );
};
