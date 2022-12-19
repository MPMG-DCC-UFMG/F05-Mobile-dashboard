import * as Sentry from "@sentry/react";
import React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import Config from "./config/Config";
import * as serviceWorker from "./serviceWorker";

declare global {
  interface Window {
    _env_: any;
  }
}

Sentry.init({ dsn: Config.SENTRY_DNS, environment: Config.ENVIRONMENT });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
