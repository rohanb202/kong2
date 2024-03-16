
import { Input } from "@/components/ui/input"
import { useState, useEffect} from "react";
import CategoryButton from "./CategoryButton";
// import { useState,useEffect } from "react";
const Cateogories = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  text: `Item ${index + 1}`,
}));

export default function Filter() {
    const [currentFilter,setCurrentFilter]=useState("tasks");
    const [tags,setTags]=useState([]);
    async function fetchTags(){
        const res=await fetch(`/api/categories?tag=${currentFilter}`);
        const data=await res.json();
        setTags(data);
    }
    useEffect(()=>{
        
        fetchTags();
        
        console.log(currentFilter);
    },[currentFilter])
  return (
    <div className="flex flex-col flex-wrap ">
        <div className="flex flex-wrap gap-2 p-4 text-sm ">
            <button onClick={()=>{setCurrentFilter("tasks")}}>Task</button>
            <button onClick={()=>{setCurrentFilter("libraries")}}>Libraries</button>
            <button onClick={()=>{setCurrentFilter("datasets")}}>Datasets</button>
            <button>Languages</button>
            <button>Licenses</button>
            <button>Other</button>
        </div>
        <div className="">
            <Input className="bg-slate-100" type="text" placeholder="Filter" />
        </div>
        <div className="flex flex-wrap justify-start p-4">
          {tags.map((category)=>(
            
            <CategoryButton key={category._id} text={category.title}/>
          ))}
        </div>
        
    </div>
  )
}

