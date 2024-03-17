import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Head from "next/head";
import kong from "../assets/images/gorilla.png"
import Image from "next/image"
function Register() {
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    setError,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [msg, setMsg] = useState(null);
  const onSubmit = async (data) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const dataUser = await response.json();
    if (dataUser?._id) {
      router.push("/login");
    } else {
      setMsg(dataUser?.error);
    }
  };
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-blue-400/50 to-emerald-400/50">
      <Head>
        <title>Kong | Register</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <div className="absolute inset-0  w-[50vw]  max-h-[80vh] bg-white  min-w-[300px] max-w-[28rem] flex flex-col items-center justify-center m-auto rounded-lg shadow-lg">
        <Image className="relative w-20 -top-10" src={kong} alt={'kong-icon'} />
        <h1 className="relative pt-2 text-3xl font-semibold -top-5">Join Kong</h1>
        <h2 className="relative pb-2 text-lg text-center md:text-xl text-black/50 -top-5">Join the community of machine learners!</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6"
        >
          <label className="block">
            <span className="text-gray-700">Name</span>
            <input
              autoComplete="off"
              type="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Your Name"
              {...register("name", { required: true })}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Email</span>
            <input
              autoComplete="off"
              type="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              placeholder="Password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              {...register("password", { required: true })}
            />
          </label>

          <div className="flex items-center justify-center ">
            <button
              type="submit"
              className="text-white w-full text-center bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
            >
              Sign Up
            </button>
          </div>
        </form>
        <h1>
          Already have an account?{" "}
          <button
            className="py-2 text-blue-400"
            onClick={() => router.push("/login")}
          >
            Log In
          </button>
        </h1>
        {msg && <h1 className="pt-2 text-red-500">{msg}</h1>}
      </div>
    </div>
  );
}

export default Register;