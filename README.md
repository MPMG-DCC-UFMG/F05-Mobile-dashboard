# F05-Mobile-dashboard

Dashboard that will be used to manage the Trena project backend (F05-Mobile-backend) 

This project it's using React as framework and Typescript as main language

## 1. Third-party 

The list of all the third party libraries used are:

* [Zustand](https://github.com/pmndrs/zustand): A small, fast and scalable bearbones state-management solution using simplified flux principles.
* [Material-UI](https://mui.com/): A comprehensive suite of UI tools library.
* [SuperAgent](https://visionmedia.github.io/superagent/): Light-weight progressive ajax API crafted for flexibility, readability, and a low learning curve
* [Leaflet](https://leafletjs.com/index.html): Leading open-source JavaScript library for mobile-friendly interactive maps.
* [React-Query](https://react-query-v3.tanstack.com/): Fetching, caching, synchronizing and updating server state in React applications tool
* [React-Router-DOM](https://reactrouter.com/en/main): Client side routing library
 
### 1.2. Services

Services used to provide features into this project:

* [Cep Aberto](https://cepaberto.com/): free webservice to query CEP in Brazil.

## 2. Configuration

There is a file called .env in the root folder. That file holds the global environment default values used trough the application:

```bash
VITE_REACT_APP_ENVIRONMENT=development
VITE_REACT_APP_BASE_URL=http://0.0.0.0:8000
VITE_REACT_APP_SENTRY_DNS=<SENTRY_KEY>
VITE_REACT_APP_API_KEY=<API_KEY>
VITE_ADMIN_USERNAME=<ADMIN_USERNAME>
VITE_ADMIN_PASSWORD=<ADMIN_PASSWORD>
```

## 3. Build

The dashboard was made to be deployed using docker. To build the docker image just go to the
root of the folder where the Dockerfile.prod file is and run the command:

```bash
docker build -t f05_dashboard -f Dockerfile.prod .
```
