"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Package,
  DollarSign,
  MessageSquare,
  // Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { LogoutModal } from "@/components/modals/logout-modal"
import { logout } from "@/services/auth"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "My Customers", href: "/customers" },
  { icon: Package, label: "Inventory", href: "/inventory" },
  { icon: DollarSign, label: "Finance", href: "/finance" },
  { icon: MessageSquare, label: "Communications", href: "/communications" },
  // { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
  const [open, setOpen] = useState(true)
  const pathname = usePathname()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const handleLogout = () => {
    console.log("User logged out")
    setIsLogoutModalOpen(false)
    logout()
  }
  
  return (
    <div
      className={cn(
        "bg-black text-white transition-all duration-300 flex flex-col border-r border-slate-900",
        open ? "w-64" : "w-20"
      )}
    >
      <div className={cn("flex items-center justify-between p-4 border-b border-slate-800", open ? "py-2.5" : "py-4.5")}>
        {open ? (
          <Image
            src="/logo/rovic-logo-white.png"
            alt="Rovic Oil & Gas Logo"
            width={120}
            height={30}
            className="transition-all"
          />
        ) : (
          <Image
            src="/logo/rovic-logo-icon.png"
            alt="Rovic Oil & Gas Icon"
            width={30}
            height={30}
            className="transition-all"
          />
        )}

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          {open ? (
            <ChevronLeft size={20} className="text-slate-300" />
          ) : (
            <ChevronRight size={20} className="text-slate-300" />
          )}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all group",
                isActive
                  ? "bg-[#1E293B] text-white"
                  : "text-slate-300 hover:bg-[#FFFFFF0D]"
              )}
              title={!open ? item.label : undefined}
            >
              <Icon size={20} className="shrink-0" />
              {open && <span className="truncate">{item.label}</span>}

              {!open && (
                <span className="absolute left-20 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 rounded-lg w-full transition-colors cursor-pointer"
          >
            <LogOut size={20} className="shrink-0" />
            {open && <span>Log Out</span>}
          </button>
        </div>
      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} onConfirm={handleLogout} />
    </div>
  )
}
