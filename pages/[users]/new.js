import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form"
import Markdown from 'react-markdown'
import gfm from 'remark-gfm';
// import SyntaxHighlighter from 'react-syntax-highlighter';
import { useState,useEffect } from 'react';
import { useRecoilState } from "recoil";
import { userState } from "@/atoms/userAtom";
import { useRouter } from "next/router"; 

import { ScrollArea } from "@/components/ui/scroll-area"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
// const MarkComponent = ({value,language}) => {
  
//     return (
//       <SyntaxHighlighter language={language ?? null} >
//         {value ?? ''}
//       </SyntaxHighlighter>
//   )};

//   const TagInput = ({ tags, selectedTags, addTag, removeTag }) => {
//     return (
//       <div className="flex flex-wrap gap-2">
//         {selectedTags?.map((tag, index) => (
//           <div key={index} className="flex items-center p-1 text-white bg-black rounded-md">
//             <span className="mr-2">{tag}</span>
//             <button type="button" onClick={() => removeTag(tag)}>&times;</button>
//           </div>
//         ))}
//         <select onChange={(e) => addTag(e.target.value)}>
//           <option value="">Choose a tag</option>
//           {tags?.map((tag) => (
//             <option className="py-2 text-sm text-gray-700 dark:text-gray-200" key={tag._id} value={tag.title}>{tag.title}</option>
//           ))}
//         </select>
//       </div>
//     );
//   };

export default function New() {
    const [model,setModel]=useState(`## Enter Description Here by Clicking Edit button`);
    const [edit,setEdit]=useState(false);
    const [user,setUser]=useRecoilState(userState);
    const router=useRouter();
    const [selectedTags, setSelectedTags] = useState([]);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      const [disableBtn, setDisableBtn] = useState(false);
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
        }catch(e){
            console.log(e);
        }finally{
            setTimeout(() => {
                setDisableBtn(false);
              }, 2000);
        }
        
      
    //   console.log(await response);
  
    }
    
    useEffect(()=>{
        if(!user){
            console.log("can't find user");
            router.push('/');
        }
    },[user])
    
    const [isOpen, setIsOpen] = useState(false);
    const [tags, setTags] = useState([]);
    

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

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
    }

    useEffect(() => {
        fetchTags();           
    }, []); 
    useEffect(() => {
        console.log()          
    }, [disableBtn]);
      
  return (
    
    <>
        <Navbar/>
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
                                    <div key={index} className="flex items-center p-1 text-white rounded-md bg-slate-800">
                                        <span className="mr-2">{tag}</span>
                                        <button type="button" onClick={(e) => {e.preventDefault(); removeTag(tag)}}>&times;</button>
                                    </div>
                                    ))}
                            
                            </div>
                            {/* <button
                                onClick={(e)=>{e.preventDefault(); toggleDropdown()}}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="button"
                            >
                            Select Tags
                            <svg
                            className={`w-2.5 h-2.5 ms-3 ${isOpen ? 'transform rotate-180' : ''}`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                            >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                            </svg>
                        </button> */}

                        
                            <DropdownMenu>
                                <DropdownMenuTrigger  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Select Tags
                                </DropdownMenuTrigger>
                                
                                <DropdownMenuContent >
                                    <ScrollArea className="h-60">
                                {tags?.map((tag) => (
                                <DropdownMenuItem key={tag._id}>
                                    <button
                                    type="button"
                                    onClick={(e) => {e.preventDefault(); addTag(tag.title)}}
                                    className="block w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                    {tag.title}
                                    </button> 
                                    
                                </DropdownMenuItem>
                                ))}
                                </ScrollArea>
                                </DropdownMenuContent>
                                
                                
                            </DropdownMenu> 
                            
                            {/* {isOpen && (
                            <div className="absolute z-10 mt-2 overflow-y-auto bg-white divide-y divide-gray-100 rounded-lg shadow h-60 w-60 dark:bg-gray-700">
                                
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            
                                {tags?.map((tag) => (
                                <li key={tag._id}>
                                    <button
                                    type="button"
                                    onClick={(e) => {e.preventDefault(); addTag(tag.title)}}
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                    {tag.title}
                                    </button>
                                </li>
                                ))}
                                
                            </ul>
                            
                            </div>
                        
                            )} */}

                        <button disabled={disableBtn} type="submit" className="hidden lg:block text-white my-3 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create Model</button>
                            
                            </div>
                        </div>
                        <div className="hidden lg:block min-h-screen h-full  border-slate-400 border-[1px]"></div>
                        <div className="w-full min-h-screen p-10 h-96 lg:w-2/3">
                                <div className="flex items-center justify-between pb-5">
                                    <h1 for="text" className="block text-base font-medium text-gray-900 dark:text-white">Markdown</h1>
                                    
                                    <button onClick={(e)=>{e.preventDefault();setEdit(!edit)}} className='w-20 p-1 text-white bg-black rounded-md'>{edit?"Save":"Edit"}</button>
                                
                                </div>
                                <span className="prose ">
                                    {!edit && <Markdown className='h-full p-5 rounded-md bg-blue-50' remarkPlugins={[gfm]}>{model}</Markdown>} 
                                    {edit && <textarea {...register("mark_down")} className='w-full h-full bg-red-100 rounded-md' value={model} onChange={(e)=>setModel(e.target.value)}/>}
                                </span>
                        </div>
                        
                        <button disabled={disableBtn} type="submit" className=" lg:hidden text-white my-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Model</button>
                    </form>
                
            </div>
        </div>
    </>
  )
}
