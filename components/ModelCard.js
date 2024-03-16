
import {ArrowDownTrayIcon,HeartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
export default function ModelCard({ModelData}) {
  return (
    <Link href={`/${ModelData.author}/${ModelData._id}`}>
    <div className='p-2 group hover:cursor-pointer mr-2 mt-2 rounded-md backdrop-blur-sm bg-gradient-to-l from-slate-700 to-slate-900 text-white w-[25rem] flex flex-grow flex-col'>
        <div>
            <h2 className='group-hover:text-blue-400 '>{ModelData.author}/{ModelData.title}</h2>            
        </div>
        <div  className='flex items-center justify-start space-x-3 text-xs'>
            <h3>{ModelData.task.title}</h3>
            <h3>Updated about 5 hours ago</h3>
            <div className='flex'>
                <ArrowDownTrayIcon className='w-3'/>
                <h3 className=''>{ModelData.stars}</h3>
            </div>
            <div className='flex'>
                <HeartIcon className='w-3'/>
                <h3>{ModelData.likes}</h3>
            </div>
        </div>
    </div>
    </Link>
  )
}
