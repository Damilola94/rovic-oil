"use client"

import { Input } from "@/components/ui/input"
import Image from "next/image"

export function Header({ pageTitle }: { pageTitle?: string }) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div className="flex-1 max-w-md">
        {pageTitle && <h1 className="text-2xl font-semibold text-slate-900">{pageTitle}</h1>}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
           <Image
            src="/svg/search-normal.svg"
            alt="Rovic Oil & Gas Logo"
            width={20} height={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" 
          />
          <Input type="text" placeholder="Search" className="pl-10 bg-gray-50 border-gray-300 py-4" />
        </div>
        <button className="p-2 border border-gray-300 bg-white hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
          <Image
            src="/svg/notification-bing.svg"
            alt="Rovic Oil & Gas Logo"
            width={20} height={20}
          />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer">
            RR
          </div>
          <span className="text-sm font-medium text-slate-900">Ryan Reynolds</span>
        </div>
      </div>
    </header>
  )
}
