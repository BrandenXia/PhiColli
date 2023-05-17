import React from "react";

interface popupProp {
  children: React.ReactNode,
  show: boolean,
}

export default function Popup(prop: popupProp) {
  if (!prop.show) return null;
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-10 backdrop-blur-sm z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-50 dark:bg-zinc-800 rounded-2xl p-4 drop-shadow-lg dark:border dark:border-zinc-500">
        { prop.children }
      </div>
    </div>
  )
}