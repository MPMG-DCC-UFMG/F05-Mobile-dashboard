import "bulma-o-steps/bulma-steps.css";
import "bulma/css/bulma.css";
import React from "react";
import "./styles/App.css";
import "./styles/trena.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AppRoutes } from "./routes/routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
