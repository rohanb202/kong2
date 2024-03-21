import Image from 'next/image'


import kong2 from '../public/assets/images/kong2.webp'

import {StarIcon} from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'
import { useState } from 'react';
import { useEffect } from 'react';
export default function Hero() {
  let {theme}=useTheme();
  const[themeX,setThemeX]=useState('light');
  useEffect(()=>{
    setThemeX(theme);
  },[theme])
  // console.log(theme);
  return (
    <section  className={`h-screen mx-5 my-6 text-white  backdrop-blur-sm  md:mx-10 rounded-3xl ${(themeX=='dark')?` border-[1px] bg-gradient-to-l from-slate-100 to-slate-800 `:` bg-gradient-to-l from-slate-700 to-slate-900 `} `}>
        <div className='flex flex-col items-center justify-between h-full md:justify-between md:flex-row'>
            <div  className='flex flex-col items-center p-10 mt-2 md:space-y-6 md:items-start'>
                <h2 className='text-2xl md:text-3xl '>Kong app</h2>
                <h1 className='text-3xl font-bold text-center md:text-left lg:text-7xl'> The AI community <br/> building the <br/> future.</h1>
               <div className='flex-col items-center justify-center hidden space-y-2 md:flex md:space-y-0 md:space-x-2 md:flex-row'>
                  {/* <Image alt="apppstore"  className='pt-2 w-28 md:w-40 md:pt-0' src={appstore}></Image> */}
                  <div className='flex flex-col items-center md:items-start'>
                    <div className='flex items-center justify-center'>
                      <StarIcon className='w-5 text-yellow-400 '/>
                      <StarIcon className='w-5 text-yellow-400 '/>
                      <StarIcon className='w-5 text-yellow-400 '/>
                      <StarIcon className='w-5 text-yellow-400 '/> 
                      <StarIcon className='w-5 text-yellow-400 '/>                  
                    </div>
                    {/* <h1 className='text-sm text-black'>100+ appstore review</h1> */}
                  </div>               
               </div>
               
            </div>
            
            <Image alt="kong kong"  priority className='object-contain w-auto h-2/3 ' src={kong2}/>
        </div>
    </section>
  )
}

