import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";
import InnerSec from "@/components/InnerSec";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (    
    <div className="">      
      <Navbar/>
      <Hero/>
      <Carousel/>
      <InnerSec/>
      <Footer/>

    </div>
  );
}
