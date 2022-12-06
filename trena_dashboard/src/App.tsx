import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";
import "./styles/trena.css";

import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import { AppRoutes } from "./routes/routes";
import { trenaTheme } from "./utils/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 10000,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={trenaTheme}>
        <AppRoutes />
        <ReactQueryDevtools />
        <ToastContainer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
