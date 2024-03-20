
import { Input } from "@/components/ui/input"
import { useRouter as UseRouter } from "next/router";
import { useState as UseState,useEffect as UseEffect,useCallback as UseCallback, useEffect } from 'react';
import CategoryButton from "./CategoryButton";
import ClipLoader from "react-spinners/ClipLoader";
import UseDebounce from "@/utils/UseDebounce";
// import { useState,useEffect } from "react";
// const Cateogories = Array.from({ length: 50 }, (_, index) => ({
//   id: index + 1,
//   text: `Item ${index + 1}`,
// }));

export default function Filter() {
    const router=UseRouter();
    const searchParams=UseRouter.query; 
    const [currentFilter,setCurrentFilter]=UseState("tasks");
    const [tags,setTags]=UseState([]);
    const [filteredSearch, setFilteredSearch] = UseState([]);
    const [loading, setLoading] = UseState(false);
    const [select,setSelect]=UseState();
    // async function fetchTags(){
    //   setLoading(true);
    //     try{
    //       const res=await fetch(`/api/categories?tag=${currentFilter}`);
    //       const data=await res.json();
    //       setTags(data);
    //       setFilteredSearch(data);
    //     }catch(e){

    //     }finally{
    //       setLoading(false);
    //     }
        
    // }
    function filterByTag(array, tag) {
      return array.filter(obj => obj.tag === tag);
    }
    async function fetchAllTags(){
      setLoading(true);
        try{
          const res=await fetch(`/api/categories?tag=all`);
          const data=await res.json();
          setTags(data);
          // setFilteredSearch(data);          
          setFilteredSearch(filterByTag(data,currentFilter));
          // console.log(filteredSearch,tags);
        }catch(e){

        }finally{
          setLoading(false);
        }
        
    }
    useEffect(()=>{
      fetchAllTags();      
    },[]);
    
    UseEffect(()=>{
        // console.log(filterByTag(tags,currentFilter),currentFilter);
        setFilteredSearch(filterByTag(tags,currentFilter));
        
        
        // console.log(currentFilter);
    },[currentFilter])

    const pathname=router.pathname;
    
    // useEffect(()=>{
    //   console.log(filteredSearch)
    // },[filteredSearch])
    const createQueryString = UseCallback(
      (name, value) => {
        const params = new URLSearchParams(searchParams)
        if(value){
          params.set(name, value)
        }
        
        
        return params.toString()
      },
      []
    )
    
    const [searchTerm, setSearchTerm] = UseState('');    
    UseDebounce(() => {
      
      if(!searchTerm && tags.length > 0){
        setFilteredSearch(filterByTag(tags,currentFilter));
        return;
      }
      if(!tags.length && !searchTerm){
        return;
      }
      
      const filtered = filterByTag(tags,currentFilter)?.filter(doc =>
          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
      setFilteredSearch(filtered);
      // console.log('filtered',filtered);
      // console.log('tags',tags);
      }, [searchTerm], 800
    );
    const handleChange = (event) => {      
      setSearchTerm(event.target.value);
    }
    useEffect(()=>{
      // console.log(select);
      // console.log(router.query.tag);
      if(!router.query.tag)return;
      if(!select)setSelect(router.query.tag);
    },[router.query])
    UseEffect(()=>{  
      // console.log(select);
        if(select===null){
          
          router.push(pathname + '?' + createQueryString("tag", ''));
          // router.push(pathname + '?' + removeQueryParam(select));
          return;
        }
        
        
        
        
    },[select])
  function tagHandler(e){
    // console.log(e.target.textContent);
    setSelect(e.target.textContent);
    router.push(pathname + '?' + createQueryString("tag", e.target.textContent))
  }
  return (
    <div className="flex flex-col flex-wrap ">
        <div className="flex flex-wrap justify-between gap-1 p-4 text-xs ">
            <button alt="tasks" className={`p-2 rounded-md bg-slate-900 ${(!currentFilter||"tasks"===currentFilter)?"text-white":"text-white/50"}`} onClick={()=>{setCurrentFilter("tasks")}}>Task</button>
            <button alt="libraries" className={`p-2 rounded-md bg-slate-900 ${(!currentFilter||"libraries"===currentFilter)?"text-white":"text-white/50"}`} onClick={()=>{setCurrentFilter("libraries")}}>Libraries</button>
            <button  alt="datasets"className={`p-2 rounded-md bg-slate-900 ${(!currentFilter||"datasets"===currentFilter)?"text-white":"text-white/50"}`}onClick={()=>{setCurrentFilter("datasets")}}>Datasets</button>
            <button  alt="languages"className={`p-2 rounded-md bg-slate-900 ${(!currentFilter||"languages"===currentFilter)?"text-white":"text-white/50"}`}onClick={()=>{setCurrentFilter("languages")}}>Languages</button>            
            <button  alt="other" className={`p-2 rounded-md bg-slate-900 ${(!currentFilter||"other"===currentFilter)?"text-white":"text-white/50"}`}onClick={()=>{setCurrentFilter("other")}}>Other</button>
        </div>
        <div className="flex items-center">
            <Input value={searchTerm} onChange={handleChange} className=" bg-slate-100" type="text" placeholder="Filter" />
            {select && <button alt="reset tag" onClick={()=>{setSelect(null)}} className="w-20 p-1 m-2 text-xs text-white bg-gray-800 rounded-md text-nowrap">Reset Filter</button>}
        </div>
        <div className="flex flex-wrap justify-start p-4">
          {!loading && filteredSearch?.map((category)=>(
            
            <button alt="select tag" className={`p-2 m-1 text-xs ${(!select||select===category.title)?"text-white":"text-white/50"} bg-gray-800 rounded-md backdrop-blur-sm `} key={category._id} onClick={tagHandler}>{category.title}</button>
          ))}
          { loading &&  <div className='flex items-center justify-center w-full p-5'>
              <ClipLoader
                    
                    loading={loading}
                    
                    size={40}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  
            </div>}
          
        </div>
        
    </div>
  )
}

