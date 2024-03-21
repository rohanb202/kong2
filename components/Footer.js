import React from "react";
import Image from "next/image";
import { MapIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
// import smile from "../assets/images/smile.png"
import kong from "../public/assets/images/kong.png";

export default function Footer() {
  return (
    <div>
      <hr></hr>
      <div>
        <div className="relative flex flex-col items-center justify-center m-auto my-2">
          <Image alt="eyeglass emoji" className="w-24 " src={kong} />
          <h1 className="text-3xl font-semibold text-zinc-600 dark:text-zinc-500">
            Kong
          </h1>
        </div>
        <div className="flex flex-col justify-center w-full pt-5 space-y-4 md:items-center md:flex-row md:space-y-0 md:space-x-7">
          <div className="flex items-center justify-center space-x-2">
            <MapIcon className="w-8 p-1 text-white rounded-full dark:bg-zinc-500 bg-zinc-600" />
            <h1>26 BakerStreet,10117 India</h1>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <EnvelopeIcon className="w-8 p-1 text-white rounded-full dark:bg-zinc-500 bg-zinc-600" />
            <h1>Hi@kong-app.com</h1>
          </div>
        </div>

        <div className="flex justify-center">
          <footer className="pt-10 pb-5 font-light">
            &#169; 2024 xono All rights reserved
          </footer>
        </div>
      </div>
    </div>
  );
}
