import React from 'react'
import { gsap } from "gsap";
import { useEffect,useLayoutEffect,useRef } from 'react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SlideCard from './SlideCard';
import smile from "../assets/images/smile.png"
gsap.registerPlugin(ScrollTrigger);
export default function Carousel() {
    
    const component = useRef();
    const slider = useRef();   
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
          let panels = gsap.utils.toArray(".panel");
          gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: slider.current,
              pin: true,
              scrub: 2,
              snap: 1 / (panels.length - 1),
              
              start:"-=50%",
            //   end:"+=100%",
              end: () => "+=" + slider.current.offsetWidth/(2),
            //   markers: true
            }
          });
        }, component);
        return () => ctx.revert();
      },[]);
  return (
    <div ref={component} className='overflow-hidden '>
        <div className='flex flex-col items-center justify-center mx-20 my-20 space-y-20 md:space-y-0 md:space-x-10 md:flex-row'>
            <div className='text-3xl font-bold text-center md:text-left md:w-1/3'>Enterprise</div>
            <div className='text-lg text-center md:text-left md:w-1/3'>Give your team the most advanced platform to build AI with enterprise-grade security, access controls and dedicated support.
            </div>
            <div className='text-lg text-center md:text-left md:w-1/3'>
            a vibrant AI community hub designed to foster collaboration, innovation, and exploration in the realm of artificial intelligence.
            Starting at $20/user/month
            </div>

        </div>
        <div ref={slider}  className='my-10 '>
            <div>
                <h3 data-aos="zoom-out-right" data-aos-duration="500" className='mx-5 text-3xl font-bold md:text-5xl'>Our Open Source</h3>
            </div>
            <div className='flex justify-center w-screen my-10 space-x-10 '>
                
                <div className='w-96 shrink-0 rounded-3xl h-60 bg-slate-300 panel'></div>
                <SlideCard img={smile} color={`bg-amber-200`} title={`Transformers`} desc={`State-of-the-art ML for
Pytorch, TensorFlow, and
JAX.`}/>

                <SlideCard color={`bg-sky-200`} img={smile} title={`Diffusers`} desc={`State-of-the-art diffusion
models for image and audio
generation in PyTorch.`}/>
                <SlideCard rot={1} img={smile} color={`bg-fuchsia-200`} title={`Timm`} desc={`State-of-the-art computer
vision models, layers,
optimizers,
training/evaluation, and
utilities.`}/>

                <SlideCard color={`bg-green-200`} img={smile} title={`PEFT`} desc={`Parameter efficient
finetuning methods for large
models.`}/>
            </div>
        </div>
    </div>
  )
}

