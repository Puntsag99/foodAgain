import { Header } from "./_components/home/Header";
import Image from "next/image";

const Home = () => {
  return (
    <div className="w-screen">
      <Header />

      <div className="w-screen relative h-[570px]">
        <Header />
        <Image src="/img/BG.png" alt="fafa" fill className="object-cover" />
      </div>
    </div>
  );
};

export default Home;
