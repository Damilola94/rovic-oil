"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { useRouter, usePathname } from "next/navigation";
import { noLayoutRoutes } from "@/lib/utils";
import { Loader } from "@/components/ui/loading";
import { useCookies } from "react-cookie";

interface ProtectedWrapperProps {
  children: React.ReactNode;
}

export default function ProtectedWrapper({ children }: ProtectedWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [cookies] = useCookies(["data"]); 
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const isPublicRoute = noLayoutRoutes.includes(pathname);
      const token = cookies?.data?.token; 

      if (isPublicRoute) {
        if (token && pathname === "/login") {
          router.push("/dashboard");
          return;
        }
        setIsAuthed(true);
      } else {
        if (!token) {
          router.push("/login");
          return;
        }
        setIsAuthed(true);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router, cookies]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <Loader />
      </div>
    );
  }

  if (!isAuthed) return null;

  return <>{children}</>;
}
