"use client"

import type React from "react"

import { Sidebar } from "./sidebar"
import { Header } from "./header"

export function DashboardLayout({ children, pageTitle}: { children: React.ReactNode ,pageTitle?: string}) {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header pageTitle={pageTitle}/>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
