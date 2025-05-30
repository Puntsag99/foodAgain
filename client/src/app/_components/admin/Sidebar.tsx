import Image from "next/image";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  return (
    <div className="w-[205px] h-full bg-[#FFFFFF] flex flex-col gap-y-10 items-center py-9">
      <div className="flex gap-x-3">
        <Image width={46} height={37} alt="bf" src="/img/Screenshot.png" />
        <div className="flex flex-col">
          <span className="text-xl font-normal">
            <span className="text-black">NomNom</span>
          </span>
          <p className="text-xs font-normal text-[#71717A]">Swift delivery</p>
        </div>
      </div>
      <Button className="flex gap-x-[10px] w-[165px] h-10 bg-white text-black hover:bg-black hover:text-white cursor-pointer">
        <Image width={16.5} height={16.5} alt="afaf" src="/img/Vector.png" />
        Food menu
      </Button>
      <Button className="flex gap-x-[10px] w-[165px] h-10 bg-white text-black hover:bg-black hover:text-white cursor-pointer">
        <Image width={16.5} height={16.5} alt="afaf" src="/img/Car.png" />
        Orders
      </Button>
    </div>
  );
};
