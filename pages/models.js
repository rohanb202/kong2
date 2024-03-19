import React from 'react'
import { useRouter  } from "next/router";
import { useState,useEffect,useCallback} from 'react';
import Filter from '@/components/Filter';
import { Input } from '@/components/ui/input';
import ModelCard from '@/components/ModelCard';
import Navbar from '@/components/Navbar';
import Sort from '@/components/Sort';
import PaginationElement from '@/components/PaginationElement';
import {
  Dialog,
  DialogClose,
  DialogContent, 
  DialogTrigger,
} from "@/components/ui/dialog"
import ClipLoader from "react-spinners/ClipLoader";
import { ScrollArea } from '@/components/ui/scroll-area';
import useDebounce from '@/utils/UseDebounce';
import { Button } from '@/components/ui/button';

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
export default function Models() {
    const router = useRouter();
    let page=parseInt(router.query.page,10);
    page=(!page||page<1)?1:page;
    let perPage=20;

    const [models,setModels]=useState({items:[],count:0});    
    const [searchTerm, setSearchTerm] = useState(null); 
    const [loading, setLoading] = useState(false);   
    async function fetchModels(){
      let params = new URLSearchParams(router.query).toString(); 
      // if(params){
      //   params=params+'&';
      // }
      setLoading(true);
      try{
        // console.log(`/api/models?${params}`);
        const res=await fetch(`/api/models?${params}`);
        const data=await res.json();
        setModels(data);
      }catch(e){

      }finally{
        setLoading(false);
      }
      
    }
    const pathname=router.pathname;
    const searchParams=router.query;
    const createQueryString = useCallback(
      (name, value) => {
        const params = new URLSearchParams(searchParams)
        // for (const [name1, value] of params.entries()) {
        //   if (value === '') {
        //     params.delete(name1);
        //   }
        // }
        params.set(name, value)
        params.set('page',1);
        return params.toString()
      },
      [searchTerm]
    )
    
    // async function GlobalSearch(){
    //   const res=await fetch(`/api/models?search=${searchTerm}`);
    //   const data=await res.json();
    //   setFilteredDocuments(data);
      
    // }
    // const removeQueryParam = React.useCallback(
    //   (name) => {
    //       const params = new URLSearchParams(searchParams);
    //       if(params.has(name)){
    //         params.delete(name);
    //       }
          
    //       return params.toString();
    //   },
    //   []
    // );
    useEffect(()=>{ 
        
        // console.log(params); 
        // console.log(router.query);
        fetchModels();        
    },[router.query])
    // useEffect(()=>{ 
    //   if(searchTerm===null){
    //     console.log(removeQueryParam('seacrh'));
    //   }
    //   console.log(searchTerm);
      
    // },[searchTerm])
    useDebounce(() => {
      if(searchTerm===null){
        // router.push(pathname + '?' + removeQueryParam('seacrh'));
        
        return;
      }
      // GlobalSearch();
      router.push(pathname + '?' + createQueryString('search', searchTerm));
      
      }, [searchTerm], 800
    );
    const handleChange = (event) => {      
      setSearchTerm(event.target.value);
    }
    
  return (
    <>
    <Navbar/>
    <div className="flex ">
        
        <div className="w-[30%] lg:block hidden pt-6 p-4  ">
            <Filter/>
        </div>
        
        <div className="min-h-screen border-l border-gray-400 border-1"></div>
        <div className="lg:w-[70%] items-center w-full p-4 flex-col  flex px-10 pt-6 ">
            <div className="flex flex-col items-center justify-between w-full space-x-10 space-y-5 md:space-y-0 md:flex-row ">
              <div className="flex flex-col items-start justify-between w-full space-y-5 md:items-center md:space-y-0 md:flex-row">
                <div className='flex items-center justify-center gap-2'>
                  <h2 className='font-semibold'>Models</h2>
                  <h2 className='font-bold text-black/60'>{models?.count}</h2>
                </div>
                
                
                <Input value={searchTerm?searchTerm:""} onChange={handleChange} className="w-80 bg-slate-100" type="text" placeholder="Filter by name" />
                <Sort/>
                <div className=' lg:hidden'>
                
                  <Dialog className="">
                    <DialogTrigger asChild>          
                      <Button variant="outline">Filter</Button>
                    </DialogTrigger>
                    
                    <DialogContent className="overflow-y-auto rounded-lg h-[80vh] px-2">
                      <Filter/>
                      </DialogContent>
                                 
                  </Dialog>
                 
                  
              </div>
              </div>  
              
            
            </div>
          { loading &&  <div className='flex p-10'>
              <ClipLoader
                    
                    loading={loading}
                    
                    size={40}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  
            </div>}
            <div className="flex flex-wrap items-center w-full pt-6 md:flex-start ">
              {!loading &&  models?.items?.map((data)=>(
                  
                <ModelCard key={data._id} ModelData={data}/>
              ))}
              
            
            <div className="flex justify-center w-full p-8">
                
              <PaginationElement  page={page} totalDoc={models?.count} perPage={perPage}/>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}
