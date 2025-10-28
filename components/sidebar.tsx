"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Package, DollarSign, MessageSquare, Settings, LogOut } from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "My Customers", href: "/customers" },
  { icon: Package, label: "Inventory", href: "/inventory" },
  { icon: DollarSign, label: "Finance", href: "/finance" },
  { icon: MessageSquare, label: "Communications", href: "/communications" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const pathname = usePathname()

  return (
    <div className={`${open ? "w-64" : "w-20"} bg-slate-900 text-white transition-all duration-300 flex flex-col`}>
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
          <div className="w-6 h-6 bg-gradient-to-br from-orange-300 to-red-400 rounded-full"></div>
        </div>
        {open && <span className="text-xl font-bold">Rovic</span>}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-accent text-white" : "text-slate-300 hover:bg-slate-800"
              }`}
              title={!open ? item.label : undefined}
            >
              <Icon size={20} className="flex-shrink-0" />
              {open && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 rounded-lg w-full transition-colors">
          <LogOut size={20} className="flex-shrink-0" />
          {open && <span>Log Out</span>}
        </button>
      </div>
    </div>
  )
}
