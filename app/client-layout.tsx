"use client";

import type React from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import ProtectedWrapper from "./protectedwrapper";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ProtectedWrapper>
          {children}
        </ProtectedWrapper>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default ClientLayout;
