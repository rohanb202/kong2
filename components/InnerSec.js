import React from 'react'
import { useState,useEffect } from 'react'
import {HeartIcon,ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import Link from 'next/link';
import ClipLoader from "react-spinners/ClipLoader";
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
// English.
import en from 'javascript-time-ago/locale/en'
TimeAgo.locale(en)
export default function InnerSec() {
    const [models,setModels]=useState([]); 
    const [loading,setLoading]=useState(false); 

    async function fetchModels(){    
        setLoading(true);
        try{
            const res=await fetch(`/api/models/mostLoved`);
            const data=await res.json();
            setModels(data);
        }catch(err){

        }finally{
            setLoading(false);
        }  
        
      }
    useEffect(()=>{      
        
        fetchModels();        
    },[setModels]);
  return (
    <section className='mx-5 my-6 md:mx-10 rounded-3xl backdrop-blur-sm bg-gradient-to-l from-cyan-700 to-slate-900'>
        <div className='flex items-center justify-center p-8 text-2xl font-bold md:justify-between md:p-20 md:text-6xl'>
            <div data-aos="zoom-out-right" data-aos-duration="500" className='flex items-center text-white' >
                <h1>Most Loved</h1>
                <HeartIcon className='w-16 md:w-24'/>
            </div>
            <h1 data-aos="zoom-out" data-aos-duration="500" className='text-cyan-300'>Models</h1>
        </div>
        
        <div className='flex flex-col justify-between px-10 py-10 lg:flex-row lg:px-20 '>
            
            <div className='flex flex-col lg:w-1/3'>
                
                <div className='px-5 py-10 bg-white rounded-t-xl'>
                    <span className='text-xl font-bold xl:text-2xl'>About</span>
                    <h1 className='lg:text-lg xl:text-xl '>
                   {` Explore our "Most Loved Models" – celebrating AI excellence. Join us in recognizing top performers. Welcome to brilliance in AI.`}
                    </h1>
                </div>
                <div className='px-5 py-10 rounded-b-xl bg-cyan-100'>
                    <span className='text-xl font-bold md:text-2xl'>Mission</span>
                    <h1 className='lg:text-lg xl:text-xl'>                    
                        {`Join us in celebrating excellence, fostering inspiration, and recognizing the remarkable achievements of the AI models that have captured our collective admiration.`}
                    </h1>
                </div>
            </div>
            <div className='flex  flex-col lg:w-2/4 space-y-10 overflow-y-auto h-[30rem] mt-10 md:mt-0 md:p-10 mb-10 secScroll'>
                { loading &&  <div className='flex justify-center w-full p-10'>
                <ClipLoader
                        
                        loading={loading}
                        
                        size={100}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    
                </div>}
                {!loading && models?.map((ModelData)=>(
                    <Link key={ModelData._id} href={`/${ModelData.author}/${ModelData._id}`}>
                        <div className='px-5 py-5 m-2 bg-white md:py-10 rounded-xl'>
                            <span className='text-sm font-bold lg:text-xl'>{ModelData.author}/{ModelData.title}</span>
                            <div  className='flex items-center justify-start space-x-1 text-xs lg:space-x-3'>
                                <h3>{ModelData?.tags[0]}</h3>
                                
                                <h3>Updated <ReactTimeAgo date={Date.parse(ModelData.updatedAt)}/></h3>
                                <div className='flex'>
                                    <ArrowDownTrayIcon className='w-3'/>
                                    <h3 className=''>{ModelData.downloads}</h3>
                                </div>
                                <div className='flex'>
                                    <HeartIcon className='w-3'/>
                                    <h3>{ModelData.likes}</h3>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
                
                {/* <div className='px-5 py-10 bg-white rounded-xl'>
                    <span className='text-xl font-bold'>About</span>
                    <h1 className='text-lg '>
                    {`At ahead our goal is to make self-
                    improvement fun and lasting. We know there's
                    a way how to make it work. And that's what
                    aHead is all about!`}
                    </h1>
                </div>
                <div className='px-5 py-10 bg-white rounded-xl'>
                    <span className='text-xl font-bold'>Product</span>
                    <h1 className='text-lg'>                    
                        {`Sure, you could spend ages reading books or
                        sitting in seminars on how to become a better
                        spouse, parent, or manager - like we did...`}
                    </h1>
                </div>
                <div className='px-5 py-10 bg-white rounded-xl'>
                    <span className='text-xl font-bold'>About</span>
                    <h1 className='text-lg '>
                {    `At ahead our goal is to make self-
                    improvement fun and lasting. We know there's
                    a way how to make it work. And that's what
                    aHead is all about!`}
                    </h1>
                </div>
                <div className='px-5 py-10 bg-white rounded-xl'>
                    <span className='text-xl font-bold'>Product</span>
                    <h1 className='text-lg'>                    
                    {    `Sure, you could spend ages reading books or
                        sitting in seminars on how to become a better
                        spouse, parent, or manager - like we did...`}
                    </h1>
                </div> */}
            </div>
            
        </div>
    </section>
  )
}

