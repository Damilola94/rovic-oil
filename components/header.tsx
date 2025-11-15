"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { useMemo } from "react";

export function Header({ pageTitle }: { pageTitle?: string }) {
  const [cookie] = useCookies(["data"]);
  const user = cookie?.data?.user;

  const initials = useMemo(() => {
    if (!user) return "NA";
    const first = user?.firstName?.[0]?.toUpperCase() || "";
    const last = user?.lastName?.[0]?.toUpperCase() || "";
    return `${first}${last}`;
  }, [user]);

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div className="flex-1 max-w-md">
        {pageTitle && (
          <h1 className="text-2xl font-semibold text-slate-900">
            {pageTitle}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Image
            src="/svg/search-normal.svg"
            alt="Search Icon"
            width={20}
            height={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 bg-gray-50 border-gray-300 py-4"
          />
        </div>

        <button className="p-2 border border-gray-300 bg-white hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
          <Image
            src="/svg/notification-bing.svg"
            alt="Notification Icon"
            width={20}
            height={20}
          />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer">
            {initials}
          </div>
          <span className="text-sm font-medium text-slate-900">
            {user?.fullName || "User"}
          </span>
        </div>
      </div>
    </header>
  );
}
