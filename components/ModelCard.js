
import {ArrowDownTrayIcon,HeartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
TimeAgo.locale(en)
export default function ModelCard({ModelData}) {
  return (
    <Link href={`/${ModelData.author}/${ModelData._id}`}>
        <div className=' p-2 group hover:cursor-pointer mr-2 mt-2 rounded-md backdrop-blur-sm bg-gradient-to-l w-[20rem] from-slate-700 to-slate-900 text-white  md:w-[25rem] flex flex-grow flex-col'>
            <div>
                <h2 className='group-hover:text-blue-400 '>{ModelData.author}/{ModelData.title}</h2>            
            </div>
            <div  className='flex items-center justify-start space-x-1 text-xs md:space-x-3'>
                <h3>{ModelData?.tags[0]}</h3>
                <h3>Updated <ReactTimeAgo date={Date.parse(ModelData.updatedAt)}/></h3>
                <div className='flex'>
                    <ArrowDownTrayIcon className='w-3'/>
                    <h3 className=''>{ModelData?.downloads}</h3>
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
