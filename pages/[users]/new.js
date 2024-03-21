import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form"

import { useState,useEffect } from 'react';
import { useRecoilState } from "recoil";
import { userState } from "@/atoms/userAtom";
import { useRouter } from "next/router"; 
import rehypeRaw from "rehype-raw";

import dynamic from 'next/dynamic'
let Markdown=dynamic(()=>import("react-markdown"),{  ssr: false, })
import gfm from 'remark-gfm';
import { ScrollArea } from "@/components/ui/scroll-area"
import Head from "next/head";
  import metadataParser from "markdown-yaml-metadata-parser";
import { Input } from "@/components/ui/input";
import {
    Command,
    CommandEmpty,
    CommandGroup,
  
    CommandItem,
    CommandList,
    
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
// 
import { Button } from "@/components/ui/button";
import useDebounce from "@/utils/UseDebounce";
export default function New() {
    const [model,setModel]=useState(`## Enter Description Here by Clicking Edit button`);
    const [edit,setEdit]=useState(false);
    const [user,setUser]=useRecoilState(userState);
    const [error,setError]=useState();
    const router=useRouter();
    const [comboOpen, setComboOpen] = useState([])
    const [combovalue, setComboValue] = useState("")
    const [filteredTags,setFilteredTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchTerm,setSearchTerm]=useState();
    const [isOpen, setIsOpen] = useState(false);
    const [tags, setTags] = useState([]);
    const [disableBtn, setDisableBtn] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      
    async function onSubmit(data){
        //to post a task
        try{
            setDisableBtn(true);
            const response = await fetch(`/api/models/new`, {
            method: "POST",
            body: JSON.stringify({
            author: `${user?.userID}`,
            title: data.title,
            mark_down: data.mark_down,
            tags: selectedTags,          
            }),
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
            },
            });
            const f=await response.json();
            
            if(f.insertedId){
                // console.log(f);
                router.push(`/${user.userID}/${f?.insertedId}`);
            }
            
        }catch(e){
            setError(e);
            // console.log(e);
            
        }finally{
            setTimeout(() => {
                setDisableBtn(false);
              }, 2000);
        }
        
      
    
  
    }

    const addTag = (tag) => {
        if (!selectedTags.includes(tag)) {
        setSelectedTags([...selectedTags, tag]);
        }
    };

    const removeTag = (tag) => {
        const updatedTags = selectedTags.filter((t) => t !== tag);
        setSelectedTags(updatedTags);
    };
    async function fetchTags(){        
        const res=await fetch(`/api/categories?tag=all`);
        const data=await res.json();
        setTags(data);
        setFilteredTags(data); 
    }
    const handleChange = (event) => {  
        // setLoading(true);    
        setSearchTerm(event.target.value);
    }
    useDebounce(()=>{
        if(!searchTerm){
            setFilteredTags(tags);
            return;
        }
        setFilteredTags(tags.filter((t) =>  t.title.toLowerCase().includes(searchTerm.toLowerCase())));


    },[searchTerm],800)
    useEffect(() => {
        fetchTags();
               
    }, []); 
    useEffect(() => {
        // console.log()     
    }, [disableBtn]);
    useEffect(()=>{
        if(!user){
            // console.log("can't find user");
            router.push('/');
        }
    },[user])
      
  return (
    
    <>
        <Navbar/>
        <Head>
        <title>Kong | Add Model</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <div className="">
            
            <div>
                <h1 className="p-5 text-3xl font-semibold text-center">Create a new model repository</h1>
            </div>
            <div className="w-full border-slate-400 border-[1px]"></div>
            <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center lg:flex-row">
                        <div className="p-10 lg:min-h-screen lg:w-1/3">
                        <div className="flex items-end justify-center w-full mb-5 space-x-5">
                                <div>
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Owner</label>
                                    <input type="text" id="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder={`${user?user.userID:"John Doe"}`} disabled />
                                </div>
                                <h1 className="text-3xl">/</h1>
                                <div>
                                    
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model name</label>
                                    <input {...register("title")} type="text" id="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="New model name" required />
                                </div>
                                
                        </div>
                        <div className="relative inline-block text-left">
                            <div className="flex flex-wrap gap-2 py-5 mt-2">
                                
                                    {selectedTags.map((tag, index) => (
                                    <div key={index} className="flex items-center p-1 text-white rounded-md dark:bg-[rgb(18,18,18)] dark:text-white dark:border-[1px] bg-slate-800">
                                        <span className="mr-2">{tag}</span>
                                        <button alt="removeTag" type="button" onClick={(e) => {e.preventDefault(); removeTag(tag)}}>&times;</button>
                                    </div>
                                    ))}
                            
                            </div>                            
                        <Popover className="" open={comboOpen} onOpenChange={setComboOpen}>
                            <PopoverTrigger alt="searchTag" asChild>
                                <Button
                                    alt="searchTrigger"
                                    aria-label="search?"
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={comboOpen}
                                    className="text-white dark:border-[1px] bg-blue-600 hover:bg-bg-blue-400 hover:text-white/80 hover:shadow-inner"
                                >
                                    Add Tags
                                
                                </Button>
                                
                            </PopoverTrigger>
                            <PopoverContent className="mx-5 md:w-80">
                                <Command alt="search?">
                                
                                <Input className="w-[90%] m-2 border-0 ring-0" value={searchTerm} onChange={handleChange}   placeholder="..."/>
                                
                                { <CommandEmpty>No models found.</CommandEmpty>}
                                
                                <ScrollArea className="h-40">
                                <CommandGroup>
                                    {filteredTags.map((data) => (
                                        
                                        <CommandList key={data._id}>
                                            
                                            <CommandItem
                                                key={data._id}
                                                value={`${data.title}`}
                                                onSelect={(currentValue) => {
                                                setComboValue(currentValue === combovalue ? "" : currentValue)
                                                setComboOpen(false)
                                                addTag(data.title)
                                                }}
                                            >
                                                
                                                
                                                {data.title}
                                                
                                            </CommandItem>
                                            
                                    </CommandList>
                                    
                                    ))}
                                    
                                </CommandGroup>
                                </ScrollArea>
                                </Command>
                            </PopoverContent>
                            </Popover>
                        <button alt="submitForm" disabled={disableBtn} type="submit" className=" dark:border-[1px] hidden lg:block text-white my-3 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create Model</button>
                            
                            </div>
                        </div>
                        <div className="hidden lg:block min-h-screen h-full   border-slate-400 border-[1px]"></div>
                        
                         
                        <div className="w-full min-h-screen p-10 h-96 lg:w-2/3">
                                <div className="flex items-center justify-between pb-5">
                                    <h1 for="text" className="block text-base font-medium text-gray-900 dark:text-white">Markdown</h1>
                                    
                                    <button alt="editMarkdown" onClick={(e)=>{e.preventDefault();setEdit(!edit)}} className='dark:border-[1px] w-20 p-1 text-white bg-black rounded-md'>{edit?"Save":"Edit"}</button>
                                
                                </div>
                                <span className="prose dark:prose-invert ">
                                    {!edit && <Markdown rehypePlugins={[rehypeRaw]} className=' min-h-screen  p-5 rounded-md dark:border-t dark:border-l dark:border-r bg-blue-50 dark:bg-[rgb(18,18,18)] dark:text-white' remarkPlugins={[gfm]}>{
                                                            metadataParser(model ? model : "")
                                                                                 .content
                                    }</Markdown>} 
                                    {edit && <textarea {...register("mark_down")} className='w-full h-full  bg-red-100 rounded-md dark:bg-[rgb(18,18,18)] dark:text-white dark:border-[2px]  ' value={model} onChange={(e)=>setModel(e.target.value)}/>}
                                </span>
                        </div>
                        
                        <button alt="submitForm" disabled={disableBtn} type="submit" className=" lg:hidden dark:border-[1px] text-white my-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Model</button>
                    </form>
                
            </div>
        </div>
    </>
  )
}