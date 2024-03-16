
import { Input } from "@/components/ui/input"
import { useState, useEffect,useCallback} from "react";
import CategoryButton from "./CategoryButton";
import { useRouter } from "next/router";
// import { useState,useEffect } from "react";
const Cateogories = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  text: `Item ${index + 1}`,
}));

export default function Filter() {
    const router=useRouter();
    const searchParams=useRouter.query; 
    const [currentFilter,setCurrentFilter]=useState("tasks");
    const [tags,setTags]=useState([]);
    async function fetchTags(){
        const res=await fetch(`/api/categories?tag=${currentFilter}`);
        const data=await res.json();
        setTags(data);
    }
    useEffect(()=>{
        
        fetchTags();
        
        // console.log(currentFilter);
    },[currentFilter])

    const pathname=router.pathname;
    const [select,setSelect]=useState();
    const createQueryString = useCallback(
        (name, value) => {
          const params = new URLSearchParams(searchParams)
          params.set(name, value)
          // params.set("page",1)
          
          return params.toString()
        },
        [searchParams]
      )
    
    useEffect(()=>{  
        if(!select)return;  
        router.push(pathname + '?' + createQueryString(currentFilter, select))
        
        // console.log(select);
    },[select])
    function handleClick() {
      console.log("Clicked me!");
      alert("Clicked me!");
    }
  return (
    <div className="flex flex-col flex-wrap ">
        <div className="flex flex-wrap justify-between gap-1 p-4 text-sm ">
            <button onClick={()=>{setCurrentFilter("tasks")}}>Task</button>
            <button onClick={()=>{setCurrentFilter("libraries")}}>Libraries</button>
            <button onClick={()=>{setCurrentFilter("datasets")}}>Datasets</button>
            <button onClick={()=>{setCurrentFilter("languages")}}>Languages</button>            
            <button onClick={()=>{setCurrentFilter("other")}}>Other</button>
        </div>
        <div className="">
            <Input className="bg-slate-100" type="text" placeholder="Filter" />
        </div>
        <div className="flex flex-wrap justify-start p-4">
          {tags?.map((category)=>(
            
            <button className={`p-2 m-1 text-xs ${(!select||select===category.title)?"text-white":"text-white/50"} bg-gray-800 rounded-md backdrop-blur-sm `} key={category._id} onClick={()=>{setSelect(category.title)}}>{category.title}</button>
          ))}
        </div>
        
    </div>
  )
}

