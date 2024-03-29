import React, { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";
import "./styles/trena.css";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import { ThemeContext } from "./core/contexts/ThemeContext";
import { AppRoutes } from "./routes/routes";

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
	const { theme } = useContext(ThemeContext);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppRoutes />
				<ReactQueryDevtools />
				<ToastContainer />
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
