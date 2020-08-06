import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as Sentry from '@sentry/react';
import * as serviceWorker from './serviceWorker';
import Config from "./config/Config";

declare global {
    interface Window {
        _env_: any
    }
}

Sentry.init({dsn: Config.SENTRY_DNS, environment: Config.ENVIRONMENT});

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
