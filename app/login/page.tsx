"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/dashboard";
  };

  return (
    <div className="relative flex h-screen w-full bg-black text-white overflow-hidden">
      <Image
        src="/images/login-bg.png" 
        alt="Background"
        fill
        className="md:-ml-40 md:mt-20 object-left"
        priority
      />
      <div className="flex flex-col justify-center pl-12 z-10 w-1/2">
        <Image
          src="/logo/rovic-logo-white.png" 
          alt="Rovic Oil & Gas Logo"
          width={180}
          height={60}
          className="mb-56"
        />
        <h1 className="text-5xl font-semibold mb-4">Welcome Back,</h1>
        <p className="text-2xl text-gray-300">Administrator</p>
      </div>

      <div className="flex items-center justify-center w-1/2 z-10 pr-12">
        <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">
          <h2 className="text-xl font-semibold text-center text-gray-900 mb-8">
            Login to your admin panel
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg pr-10 focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#F25C3C] hover:bg-[#e45032] text-white font-medium py-5 rounded-xl mt-4 transition-colors"
            >
              Login →
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
