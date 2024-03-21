import { ArrowDownTrayIcon, HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import { useTheme } from "next-themes";

import en from "javascript-time-ago/locale/en";
TimeAgo.locale(en);
export default function ModelCard({ ModelData }) {
  const { theme } = useTheme();
  return (
    <Link href={`/${ModelData.author}/${ModelData._id}`}>
      <div
        className={` p-2 group hover:cursor-pointer mr-2 mt-2 rounded-md backdrop-blur-sm  ${
          theme == "dark"
            ? " bg-gradient-to-l from-slate-300 to-slate-100 border-[1px] text-black "
            : " bg-gradient-to-l from-slate-700 to-slate-900 text-white "
        }   w-[20rem]     md:w-[25rem] flex flex-grow flex-col `}
      >
        <div>
          <h2 className="group-hover:text-blue-400 dark:group-hover:text-blue-600">
            {ModelData.author}/{ModelData.title}
          </h2>
        </div>
        <div className="flex items-center justify-start space-x-1 text-xs md:space-x-3">
          <h3>{ModelData?.tags[0]}</h3>
          <h3>
            Updated <ReactTimeAgo date={Date.parse(ModelData.updatedAt)} />
          </h3>
          <div className="flex">
            <ArrowDownTrayIcon className="w-3" />
            <h3 className="">{ModelData?.downloads}</h3>
          </div>
          <div className="flex">
            <HeartIcon className="w-3" />
            <h3>{ModelData.likes}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
