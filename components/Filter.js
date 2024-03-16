
import { Input } from "@/components/ui/input"
import { useRouter as UseRouter } from "next/router";
import { useState as UseState,useEffect as UseEffect,useCallback as UseCallback } from 'react';
import CategoryButton from "./CategoryButton";

import UseDebounce from "@/utils/UseDebounce";
// import { useState,useEffect } from "react";
const Cateogories = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  text: `Item ${index + 1}`,
}));

export default function Filter() {
    const router=UseRouter();
    const searchParams=UseRouter.query; 
    const [currentFilter,setCurrentFilter]=UseState("tasks");
    const [tags,setTags]=UseState([]);
    const [filteredSearch, setFilteredSearch] = UseState(tags);
    async function fetchTags(){
        const res=await fetch(`/api/categories?tag=${currentFilter}`);
        const data=await res.json();
        setTags(data);
        setFilteredSearch(data);
    }
    UseEffect(()=>{
        
        fetchTags();
        
        console.log(currentFilter);
    },[currentFilter])

    const pathname=router.pathname;
    const [select,setSelect]=UseState(null);
    const createQueryString = UseCallback(
      (name, value) => {
        const params = new URLSearchParams(searchParams)
        params.set(name, value)
        
        return params.toString()
      },
      []
    )
    const removeQueryParam = UseCallback(
        (name) => {
            const params = new URLSearchParams(searchParams);
            if(params.has(name)){
              params.delete(name);
            }
            return params.toString();
        },
        []
    );
    const [searchTerm, setSearchTerm] = UseState('');    
    UseDebounce(() => {
      
      if(!searchTerm && tags.length > 0){
        setFilteredSearch(tags);
        return;
      }
      if(!tags.length && !searchTerm){
        return;
      }
      
      const filtered = tags?.filter(doc =>
          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
      setFilteredSearch(filtered);
      console.log('filtered',filtered);
      console.log('tags',tags);
      }, [searchTerm], 800
    );
    const handleChange = (event) => {      
      setSearchTerm(event.target.value);
    }
    UseEffect(()=>{  
        if(select===null){
          router.push(pathname + '?' + createQueryString("tag", ''));
          // router.push(pathname + '?' + removeQueryParam(select));
          return;
        }
        router.push(pathname + '?' + createQueryString("tag", select))
        
        // console.log(select);
    },[select])
    
  return (
    <div className="flex flex-col flex-wrap ">
        <div className="flex flex-wrap justify-between gap-1 p-4 text-xs ">
            <button className={`p-2 rounded-md bg-slate-900 ${(!currentFilter||"tasks"===currentFilter)?"text-white":"text-white/50"}`} onClick={()=>{setCurrentFilter("tasks")}}>Task</button>
            <button className={`p-2 rounded-md bg-slate-900 ${(!currentFilter||"libraries"===currentFilter)?"text-white":"text-white/50"}`} onClick={()=>{setCurrentFilter("libraries")}}>Libraries</button>
            <button className={`p-2 rounded-md bg-slate-900 ${(!currentFilter||"datasets"===currentFilter)?"text-white":"text-white/50"}`}onClick={()=>{setCurrentFilter("datasets")}}>Datasets</button>
            <button className={`p-2 rounded-md bg-slate-900 ${(!currentFilter||"languages"===currentFilter)?"text-white":"text-white/50"}`}onClick={()=>{setCurrentFilter("languages")}}>Languages</button>            
            <button className={`p-2 rounded-md bg-slate-900 ${(!currentFilter||"other"===currentFilter)?"text-white":"text-white/50"}`}onClick={()=>{setCurrentFilter("other")}}>Other</button>
        </div>
        <div className="flex items-center">
            <Input value={searchTerm} onChange={handleChange} className=" bg-slate-100" type="text" placeholder="Filter" />
            {select && <button onClick={()=>{setSelect(null)}} className="w-20 p-1 m-2 text-xs text-white bg-gray-800 rounded-md text-nowrap">Reset Filter</button>}
        </div>
        <div className="flex flex-wrap justify-start p-4">
          {filteredSearch?.map((category)=>(
            
            <button className={`p-2 m-1 text-xs ${(!select||select===category.title)?"text-white":"text-white/50"} bg-gray-800 rounded-md backdrop-blur-sm `} key={category._id} onClick={()=>{setSelect(category.title)}}>{category.title}</button>
          ))}
          
        </div>
        
    </div>
  )
}

