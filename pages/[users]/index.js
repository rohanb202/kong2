import Navbar from "@/components/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import ModelCard from "@/components/ModelCard";
import ClipLoader from "react-spinners/ClipLoader";
import { useTheme } from "next-themes";
import Head from "next/head";
export default function Index() {
  const router = useRouter();
  const { theme } = useTheme();
  const [models, setModels] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  // console.log(router.query.users);
  async function fetchModels() {
    setLoading(true);
    try {
      console.log(`/api/user?userID=${router.query.users}&model=1`);
      const res = await fetch(`/api/user?userID=${router.query.users}&model=1`);
      const data = await res.json();

      setModels(data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (router.query.users) {
      fetchModels();

      // console.log("Hello");
    }
  }, [router]);
  useEffect(() => {
    if (models.error) {
      router.push(`/404`);
    }
    if (models.user) {
      setShow(true);
    }
    // console.log(!models?.error,models?.error);
  }, [models]);

  return (
    <div>
      <Head>
        <title>Kong | {router.query.users}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      {!show && (
        <div className="flex items-center justify-center w-full h-screen">
          <ClipLoader
            loading={loading}
            color={`${theme == "dark" ? "#ffffff" : "#000000"}`}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {show && (
        <div>
          <div className="flex flex-col items-center justify-center p-5 space-y-2">
            <Avatar className="w-40 h-40 ">
              <AvatarImage
                alt="profileImg"
                src="https://github.com/shadcn.png"
              />
              <AvatarFallback>K</AvatarFallback>
            </Avatar>
            <h1 className="px-4 text-3xl font-semibold ">
              {models?.user?.name}
            </h1>
            <h2 className="">@{models?.user?.userID}</h2>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-semibold">Models</h1>
            {loading && (
              <div className="flex p-10">
                <ClipLoader
                  loading={loading}
                  size={40}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )}
            <div className="flex flex-wrap items-center justify-center w-full pt-6 md:flex-start ">
              {!loading &&
                models?.items.map((data) => (
                  <ModelCard key={data._id} ModelData={data} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
