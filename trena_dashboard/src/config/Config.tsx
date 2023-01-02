export default class Config {
  static ENVIRONMENT?: string = import.meta.env.VITE_REACT_APP_ENVIRONMENT;
  static BASE_URL?: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  static SENTRY_DNS?: string = import.meta.env.VITE_REACT_APP_SENTRY_DNS;
  static API_KEY?: string = import.meta.env.VITE_REACT_APP_API_KEY;
}
