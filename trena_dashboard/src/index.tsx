import * as Sentry from "@sentry/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Config from "./config/Config";
import { ThemeContextProvider } from "./core/contexts/ThemeContext";
import * as serviceWorker from "./serviceWorker";

declare global {
  interface Window {
    _env_: any;
  }
}

Sentry.init({ dsn: Config.SENTRY_DNS, environment: Config.ENVIRONMENT });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>
);

serviceWorker.unregister();
