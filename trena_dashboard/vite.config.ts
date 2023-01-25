import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				parserOpts: {
					plugins: ["decorators-legacy", "classProperties"],
				},
			},
		}),
		svgrPlugin(),
	],
	server: {
		port: 3000,
		host: true,
	},
});
