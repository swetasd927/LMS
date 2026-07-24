import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { router } from "./app/router";

import "./index.css";
import "antd/dist/reset.css";
import AuthProvider from "./features/auth/providers/AuthProvider";
import ThemeProvider from "./features/theme/providers/ThemeProvider";
import AntdThemeBridge from "./features/theme/components/AntdThemeBridge";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 min: it helps to avoid refetch storms against the mock adapter's localStorage
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AntdThemeBridge>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </AntdThemeBridge>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);