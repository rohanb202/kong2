// import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// import Carousel from "@/components/Carousel";
// import InnerSec from "@/components/InnerSec";
import Footer from "@/components/Footer";
import dynamic from 'next/dynamic'
let InnerSec=dynamic(()=>import("@/components/InnerSec"),{
  ssr: false,
  })
let Carousel=dynamic(()=>import("@/components/Carousel"),{
  ssr: false,
  })
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
const inter = Inter({ subsets: ["latin"] });
import { useRecoilState } from "recoil";
import { userState } from "@/atoms/userAtom";
export default function Home() {
  const [user,setUser]=useRecoilState(userState);
  useEffect(()=>{
    AOS.init();
    const userInfo=JSON.parse(localStorage.getItem('user'));
    if(userInfo){
      setUser(userInfo);
    }
  },[])
  useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(user));
  },[user])
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
