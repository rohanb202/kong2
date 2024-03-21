// import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// import Carousel from "@/components/Carousel";
// import InnerSec from "@/components/InnerSec";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
let InnerSec = dynamic(() => import("@/components/InnerSec"), {
  ssr: false,
});
let Carousel = dynamic(() => import("@/components/Carousel"), {
  ssr: false,
});
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const inter = Inter({ subsets: ["latin"] });
import Head from "next/head";
export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="">
      <Head>
        <title>Kong | Explore</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <Hero />
      <Carousel />
      <InnerSec />
      <Footer />
    </div>
  );
}
