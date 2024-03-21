import Navbar from "@/components/Navbar";
import kong from "../public/assets/images/kong.png";
import Image from "next/image";
import Head from "next/head";
export default function Custom404() {
  return (
    <div>
      <Head>
        <title>Kong | 404</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <div className="flex items-center justify-center w-full">
        <div className="absolute m-0 top-[30%] text-center flex flex-col items-center justify-center">
          <Image alt="kong kong" className="w-32" src={kong} />
          <h1 className="font-semibold text-8xl ">404</h1>
          <h2 className="text-xl">{`Sorry, we can't find the page you are looking for.`}</h2>
        </div>
      </div>
    </div>
  );
}
