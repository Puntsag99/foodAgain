import Image from "next/image";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <div className="h-[172px] bg-[#18181B] flex items-center  px-22 justify-between ">
      <div className="flex gap-x-3">
        <Image width={46} height={37} alt="bf" src="/img/Screenshot.png" />
        <div className="flex flex-col">
          <span className="text-xl font-normal">
            <span className="text-white">Nom</span>
            <span className="text-red-500">Nom</span>
          </span>
          <p className="text-xs font-normal text-[#F4F4F5]">Swift delivery</p>
        </div>
      </div>
      <div className="flex gap-x-3">
        <Button className="bg-[#F4F4F5] w-20 h-9 text-sm  text-blackfont-medium hover:bg-black hover:text-white cursor-pointer">
          Log in
        </Button>
        <Button className="bg-[#F4F4F5] w-20 h-9 text-sm  text-blackfont-medium hover:bg-black hover:text-white cursor-pointer">
          Sign up
        </Button>
      </div>
    </div>
  );
};
