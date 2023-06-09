import {Icon} from '@iconify/react';
import Link from "next/link";


export default function Navbar() {
  return (
    <nav
      className="fixed top-0 w-full h-14 sm:h-16 bg-slate-50/90 dark:bg-zinc-800 py-3 px-4 transition-colors z-10 border-b-2 border-gray-300 dark:border-gray-700">
      <Link href="/home">
        <span>
          <Icon icon="file-icons:supercollider"
                className="h-8 w-8 sm:h-10 sm:w-10 inline mr-2 sm:mr-4 text-zinc-700 dark:text-slate-300 transition-colors"/>
          <span
            className="select-none font-mono text-base sm:text-lg md:text-xl align-middle text-zinc-700 dark:text-slate-300 transition-colors">PhiColli</span>
        </span>
      </Link>
    </nav>
  )
}