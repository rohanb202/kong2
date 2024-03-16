import React from 'react'
import { useRouter } from "next/router";
import Filter from '@/components/Filter';
import { Input } from '@/components/ui/input';
import ModelCard from '@/components/ModelCard';
import Navbar from '@/components/Navbar';
import Sort from '@/components/Sort';
import PaginationElement from '@/components/PaginationElement';
import { useState,useEffect } from 'react';
// const Models = Array.from({ length: 50 }, (_, index) => ({
//     id: index + 1,
//     text: `Item ${index + 1}`,
//   }));
// export async function getServerSideProps(context){
//     let page=parseInt(context.query.page,10);
//     page=(!page||page<1)?1:page;
//     const res=await fetch(`http://localhost:3000/api/models?page=${page}`);
//     const data=await res.json();
   
//     return {
//       props:{
//         model:data,
//       }
//     }
// }
export default function models() {
    const router = useRouter();
    let page=parseInt(router.query.page,10);
    page=(!page||page<1)?1:page;
    let perPage=1;

    const [models,setModels]=useState({items:[],count:0});
    async function fetchModels(){
        const res=await fetch(`/api/models?page=${page}`);
        const data=await res.json();
        setModels(data);
    }
    useEffect(()=>{
        console.log(router.query);
        fetchModels();
        console.log(models);
    },[router.query])
  return (
    <>
    <Navbar/>
    <div className="flex ">
        
        <div className="w-[30%] lg:block hidden pt-6 p-4  ">
            <Filter/>
        </div>
        <div className="h-screen border-l border-gray-400 border-1"></div>
        <div className="lg:w-[70%] w-full p-4 flex-col flex px-10 pt-6  backdrop-blur-xl">
            <div className="flex items-center justify-between ">
              <div className="flex items-center space-x-3">
                <h2>Models</h2>
                <h2>548,548</h2>
                
                <Input className="bg-slate-100" type="text" placeholder="Filter by name" />
              </div>  
             
              <div >            
                <Sort/>
              </div> 
            </div>
            <div className="flex flex-wrap items-center pt-6 ">
            {models?.items?.map((data)=>(
                
              <ModelCard key={data._id} ModelData={data}/>
            ))}
            <div className="flex justify-center w-full p-8">
                
              <PaginationElement  page={page} totalDoc={50} perPage={perPage}/>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}
