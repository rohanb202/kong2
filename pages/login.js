import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { userState } from "../atoms/userAtom";
import Head from  "next/head";
import kong from "../public/assets/images/kong.png"
import Image from "next/image"
import Navbar from '@/components/Navbar';
import {useTheme} from "next-themes";

export default function Login() {
  const {theme}=useTheme();
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    setError,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [msg, setMsg] = useState(null);
  
  const onSubmit = async (data) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const dataUser = await response.json();
    setUser(dataUser);    
    if (dataUser?.token) {
      router.push("/");
    } else {
      setMsg(dataUser.error);
    }
    // console.log(dataUser);
  };
  return (
    <>
    
    <div className={` w-full h-screen  ${theme=='dark'?" bg-[rgb(18,18,18)] ":" bg-gradient-to-r from-blue-400/60 to-emerald-400/60 "} `}>
    <Navbar/>
      <Head>
        <title>Kong | Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="absolute dark:bg-[rgb(18,18,18)] dark:border-[1px] bg-white inset-0 h-[65vh] max-h-[40rem] w-[50vw] min-h-[400px] min-w-[300px] max-w-[450px] flex flex-col items-center justify-center m-auto rounded-lg shadow-lg">
        <Image  className="relative w-20 -top-10" src={kong} alt={'kong-icon'} />
        <h1 className="relative py-5 text-3xl font-semibold -top-10">Log In</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative grid grid-cols-1 gap-6 -top-8"
        >
          <label className="block">
            <span className="text-gray-700 dark:text-white">Email</span>
            <input
              autoComplete="off"
              type="email"
              className="shadow-sm bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[rgb(18,18,18)] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </label>

          <label className="block">
            <span className="text-gray-700 dark:text-white">Password</span>
            <input
              type="password"
              placeholder="Password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[rgb(18,18,18)] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              {...register("password", { required: true })}
            />
          </label>

          <div className="flex items-center justify-around space-x-2">
            <button
              type="submit"
              className="w-full py-2 text-white rounded-lg bg-slate-700 dark:border-[1px] dark:bg-black"
            >
              Log In
            </button>
          </div>
        </form>
        <h1>
          Don&apos;t have an account yet?{" "}
          <button
            className="py-2 text-blue-600"
            onClick={() => router.push("/register")}
          >
            Sign Up
          </button>
        </h1>
        {msg && <h1 className="py-2 text-red-500">{msg}</h1>}
      </div>
      
    </div>
    </>
  )
}
