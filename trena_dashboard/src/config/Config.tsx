export default class Config {
    static ENVIRONMENT?: string = window._env_.REACT_APP_ENVIRONMENT;
    static BASE_URL?: string = "https://trena.gsi.mpmg.mp.br";
    static SENTRY_DNS?: string = window._env_.REACT_APP_SENTRY_DNS;
    static API_KEY: string = window._env_.REACT_APP_API_KEY ?? "";
}