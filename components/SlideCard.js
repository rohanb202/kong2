import React from 'react'
import Image from 'next/image'
export default function SlideCard({desc,title,img, color,rot}) {
  return (
    <div className={`w-96 shrink-0 rounded-3xl h-60 ${color?color:`bg-slate-200`} panel ${rot?`-rotate-3`:``}`}>
        <div className='flex flex-col p-5 space-y-2'>
            <Image alt="emoji" className='object-fill w-24' src={img} />
            <h1 className='text-xl font-bold'>{title}</h1>
            <p>{desc}</p>
        </div>
    </div>
  )
}

