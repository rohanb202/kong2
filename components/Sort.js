import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
    SelectGroup
  } from "@/components/ui/select"
  import { useRouter } from "next/router";
  import { useState,useEffect,useCallback } from "react";
  export default function Sort(){
    const router = useRouter();
    const pathname=router.pathname;
    const searchParams=router.query;
    const [select,setSelect]=useState();
    const createQueryString = useCallback(
        (name, value) => {
          const params = new URLSearchParams(searchParams)
          params.set(name, value)
          
          return params.toString()
        },
        [searchParams]
      )
    useEffect(()=>{  
        if(!select)return;  
        router.push(pathname + '?' + createQueryString('sort', select))
        console.log(select);
    },[select])
    return(
    <Select onValueChange={(value)=>setSelect(value)}>
        <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort:Trending" />
        </SelectTrigger>
        <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By:</SelectLabel>
            <SelectItem value="trending">Trending</SelectItem>       
            
            <SelectItem value="dowloads">Most Downloads</SelectItem>
            <SelectItem value="likes">Most Likes</SelectItem>
          </SelectGroup>
        </SelectContent>
    </Select>
    )
  }
  