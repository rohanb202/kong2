
import {ArrowDownTrayIcon,HeartIcon } from '@heroicons/react/24/outline'
import Markdown from 'react-markdown'
import gfm from 'remark-gfm';
import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CategoryButton from '@/components/CategoryButton';
import { useState,useEffect } from 'react';
import { useRouter } from "next/router";
import Navbar from '@/components/Navbar';

export async function getServerSideProps(context){
  
  const res=await fetch(`http://localhost:3000/api/models/${context.query.id}`);
  const data=await res.json();
  return {
    props:{
      model:data,
    }
  }
}

const MarkComponent = ({value,language}) => {
  
  return (
    <SyntaxHighlighter language={language ?? null} >
      {value ?? ''}
    </SyntaxHighlighter>
)};
// const Cateogories = Array.from({ length: 5 }, (_, index) => ({
//   id: index + 1,
//   text: `Item ${index + 1}`,
// }));
export default function ModelView({model}) {
  // const router = useRouter();
  // const [model,setModel]=useState({});
  //   async function fetchModel(){
  //       const res=await fetch(`/api/models/${router.query.id}`);
  //       const data=await res.json();
  //       setModel(data);
  //   }
  //   useEffect(()=>{
  //       if(!router.query.id)return;
  //       console.log(router.query);
  //       console.log(`/api/models/${router.query.id}`);
  //       fetchModel();
  //       // console.log(model);
        
  //   },[router.query]);
  return (
    <div>
      <Navbar/>
        <div className=''>
            <div className="flex items-center gap-2 px-5 pt-4">
                <div className='text-xl md:text-2xl'>
                    {model?.author}/<span className='font-semibold'>{model?.title} </span> 
                </div>
                <div className='flex items-center gap-1 p-1 text-sm border-2 rounded-md'>
                    <div className='flex items-center pr-1 space-x-1 border-r border-1'>
                        <HeartIcon className='w-4'/>
                        <h3>Like</h3>
                    </div>
                    <h3>{model?.likes}</h3>
                </div>
                
            </div>
            <div className=''>
                <div className='flex flex-wrap items-center gap-2 p-2 px-4'>
                    {model?.tags?.map((category)=>(
                      <button key={model._id} className={`p-2 rounded-md bg-slate-900 text-white text-xs md:text-sm `}>{category}</button>
                    ))}
                    
            </div>
             <div className="w-screen border-2 border-b border-slate-700"></div>
             
            </div>

            

        </div>
        <div className='flex flex-col justify-center '>
            
            {/* <div className="h-full border-2 border-b border-gray-500"></div> */}
            <div className='md:w-[80%] w-full md:mx-auto p-1  md:p-20 bg-white md:border-b-2 md:border-l-2 md:border-r-2 border-slate-700'>
                {/* <div className='flex justify-end w-full'> */}
                    {/* <button onClick={()=>{setEdit(!edit)}} className='p-1 border-b border-l rounded-bl-md border-cyan-600'>{edit?"Save":"Edit"} model card</button> */}
                {/* </div> */}
                <span className='prose-sm prose md:prose-lg'>
                    {/* {!edit && <Markdown className='p-5 ' remarkPlugins={[gfm]}>{input}</Markdown>} 
                    {edit && <textarea className='w-full h-screen bg-red-100' value={input} onChange={(e)=>setInput(e.target.value)}/>} */}
                    { <Markdown className="mx-auto" components={MarkComponent} remarkPlugins={[gfm]} >{model?.mark_down}</Markdown>}
                </span>
                
                
                
            </div>
            

        </div>
        <div>

        </div>
        
    </div>
  )
}
