import React from "react";
import {Icon} from "@iconify/react";
import Link from "next/link";

interface projectBarProp {
  name: string,
  date: string,
  remove: (event: any) => void,
}

export default function ProjectBar(prop: projectBarProp) {
  return (
    <Link href={`/simulation/${prop.name}`}>
      <div className="flex justify-between p-2 hover:bg-slate-200 dark:hover:bg-zinc-600 rounded-2xl transition-colors border border-transparent hover:border-blue-400">
        <span className="text-lg text-slate-800 dark:text-slate-200">
          <Icon icon="nonicons:react-16" className="inline h-6 w-6 mr-2 text-gray-500 dark:text-slate-300"/>
          { prop.name }
        </span>
        <span className="text-lg text-slate-500 dark:text-slate-400 hidden sm:inline">
          { prop.date }
          <button onClick={prop.remove} className="ml-2 text-lg text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400">
            <Icon icon="mdi:delete" className="inline h-6 w-6"/>
          </button>
        </span>
      </div>
    </Link>
  )
}