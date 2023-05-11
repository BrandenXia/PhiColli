import { Icon } from '@iconify/react';


export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-16 bg-slate-50/90 dark:bg-zinc-800 py-3 px-4 transition-colors z-10">
      <Icon icon="file-icons:supercollider" width={40} className="inline mr-4 text-zinc-700 dark:text-slate-300 transition-colors"/>
      <span className="font-mono text-xl align-middle text-zinc-700 dark:text-slate-300 transition-colors">Physical Simulation App</span>
    </nav>
  )
}