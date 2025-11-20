"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import handleFetch from "@/services/api/handleFetch";
import { Loader } from "@/components/ui/loading";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const [, setCookie] = useCookies(["data"]);

  const loginMutation = useMutation(handleFetch, {
    onSuccess: (res: {
      token: string;
      message: string;
      data: { accessToken: string };
    }) => {
      if (!res?.token) {
        toast.error(res?.message || "Invalid login credentials.");
      } else {
        toast.success("Login Successful");
        setCookie("data", res, { secure: true, sameSite: true });
        router.push("/dashboard");
      }
    },
    onError: (err: { statusCode?: string; message: string }) => {
      toast.error(err?.message || "Something went wrong, please try again.");
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }
    const body = { email, password };
    loginMutation.mutate({
      endpoint: "auth/login",
      method: "POST",
      body,
    });
  };

  const { isLoading } = loginMutation;

  return (
    <div className="relative flex h-screen w-full bg-black text-white overflow-hidden">
      <Image
        src="/images/login-bg.png"
        alt="Background"
        fill
        className="object-left opacity-70 hidden md:block"
      />

      <div className="hidden md:flex flex-col justify-center pl-12 z-10 w-1/2">
        <Image
          src="/logo/rovic-logo-white.png"
          alt="Rovic Oil & Gas Logo"
          width={180}
          height={60}
          className="mb-56"
        />
        <p className="text-4xl font-semibold">Welcome Back,</p>
        <p className="text-4xl font-semibold">Administrator</p>
      </div>

      <div className="flex items-center justify-center w-full md:w-1/2 z-10 p-6 md:pr-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 w-full max-w-md">
          <h2 className="text-xl font-semibold text-center text-gray-900 mb-8">
            Login to your admin panel
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg pr-10 focus:ring-2 focus:ring-orange-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[70%] -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full bg-[#F25C3C] hover:bg-[#e45032] text-white font-medium py-5 rounded-xl mt-4 transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? "Signing In..." : "Login"}
              {!isLoading && (
                <Image
                  src="/svg/arrow-right.svg"
                  alt="Arrow"
                  width={20}
                  height={20}
                />
              )}
            </Button>
          </form>
        </div>
      </div>

      {isLoading && <Loader />}
    </div>
  );
}
