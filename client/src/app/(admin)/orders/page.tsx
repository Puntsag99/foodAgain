import { Top } from "@/app/_components/admin/Top";
import { Sidebar } from "@/app/_components/admin/Sidebar";
import { DishesCategory } from "@/app/_components/admin/DishesCategory";
import { DishesInfo } from "@/app/_components/admin/DishesInfo";

const Home = () => {
  return (
    <div className="w-screen flex gap-x-6 h-screen bg-[#F4F4F5]">
      <Sidebar />
      <div className="flex flex-col gap-y-6 py-[84px]">
        <DishesCategory />
        <Top />
      </div>
    </div>
  );
};

export default Home;
