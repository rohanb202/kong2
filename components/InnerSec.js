import React from 'react'
import {HeartIcon } from '@heroicons/react/24/solid'
export default function InnerSec() {
  return (
    <section className='mx-5 my-6 bg-purple-200 md:mx-10 rounded-3xl '>
        <div className='flex items-center justify-between p-8 text-2xl font-bold md:p-20 md:text-6xl'>
            <div data-aos="zoom-out-right" data-aos-duration="500" className='flex items-center' >
                <h1>Most Loved </h1>
                <HeartIcon className='w-16 md:w-24'/>
            </div>
            <h1 data-aos="zoom-out" data-aos-duration="500" className='text-indigo-600'>Models</h1>
        </div>
        
        <div className='flex flex-col justify-between px-10 py-10 md:flex-row md:px-20 '>
            
            <div className='flex flex-col md:w-1/3'>
                
                <div className='px-5 py-10 bg-white rounded-t-xl'>
                    <span className='text-xl font-bold xl:text-2xl'>About</span>
                    <h1 className='text-lg xl:text-xl '>
                    a showcase of the finest, most esteemed AI models within our community. As AI enthusiasts, researchers, and practitioners, we understand the value of recognizing excellence. That's why we've curated this collection, highlighting models that have garnered admiration, acclaim, and trust from our discerning users.
                    </h1>
                </div>
                <div className='px-5 py-10 rounded-b-xl bg-orange-50'>
                    <span className='text-xl font-bold md:text-2xl'>Product</span>
                    <h1 className='text-lg xl:text-xl'>                    
                    Join us in celebrating excellence, fostering inspiration, and recognizing the remarkable achievements of the AI models that have captured our collective admiration. Welcome to "Most Loved Models" – where brilliance shines brightly, and the future of AI is showcased for all to see.
                    </h1>
                </div>
            </div>
            <div className='flex flex-col md:w-2/4 space-y-10 overflow-y-auto h-[30rem] mt-10 md:mt-0 md:p-10 mb-10 secScroll'>
                
                <div className='px-5 py-10 bg-white rounded-xl'>
                    <span className='text-xl font-bold'>About</span>
                    <h1 className='text-lg '>
                    At ahead our goal is to make self-
                    improvement fun and lasting. We know there's
                    a way how to make it work. And that's what
                    aHead is all about!
                    </h1>
                </div>
                <div className='px-5 py-10 bg-white rounded-xl'>
                    <span className='text-xl font-bold'>Product</span>
                    <h1 className='text-lg'>                    
                        Sure, you could spend ages reading books or
                        sitting in seminars on how to become a better
                        spouse, parent, or manager - like we did...
                    </h1>
                </div>
                <div className='px-5 py-10 bg-white rounded-xl'>
                    <span className='text-xl font-bold'>About</span>
                    <h1 className='text-lg '>
                    At ahead our goal is to make self-
                    improvement fun and lasting. We know there's
                    a way how to make it work. And that's what
                    aHead is all about!
                    </h1>
                </div>
                <div className='px-5 py-10 bg-white rounded-xl'>
                    <span className='text-xl font-bold'>Product</span>
                    <h1 className='text-lg'>                    
                        Sure, you could spend ages reading books or
                        sitting in seminars on how to become a better
                        spouse, parent, or manager - like we did...
                    </h1>
                </div>
            </div>
            
        </div>
    </section>
  )
}

