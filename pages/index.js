import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (    
    <div className="">      
      <Navbar/>
      {/* <div className="w-full h-80 bg-slate-400 [clip-path:polygon(0%_0%,0%_100%,25%_100%,%10_10%,90%_10%,90%_90%,10%_90%,25%_100%,100%_100%,100%_0%)]"
></div> */}
    </div>
  );
}
