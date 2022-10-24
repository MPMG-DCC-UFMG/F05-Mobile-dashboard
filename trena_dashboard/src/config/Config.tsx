export default class Config {
  static ENVIRONMENT?: string = process.env.REACT_APP_ENVIRONMENT;
  static BASE_URL?: string = process.env.REACT_APP_BASE_URL;
  static SENTRY_DNS?: string = process.env.REACT_APP_SENTRY_DNS;
  static API_KEY?: string = process.env.REACT_APP_API_KEY;
}
