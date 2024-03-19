import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";
import InnerSec from "@/components/InnerSec";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  useEffect(()=>{
    AOS.init();
  },[])
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
