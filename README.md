# F05-Mobile-dashboard

Dashboard that will be used to manage the Trena project backend (F05-Mobile-backend) 

This project it's using React as framework and Typescript as main language

## 1. Third-party 

The list of all the third party libraries used are:

* [MobX](https://mobx.js.org/): a battle tested library that makes state management simple and scalable
* [Bulma](https://bulma.io/): a free, open source CSS framework based on Flexbox.
* [SuperAgent](https://visionmedia.github.io/superagent/): light-weight progressive ajax API crafted for flexibility, readability, and a low learning curve
* [Fontawesome](https://fontawesome.com/): the web's most popular icon set and toolkit.
* [Leaflet](https://leafletjs.com/index.html): leading open-source JavaScript library for mobile-friendly interactive maps.
 
### 1.2. Services

Services used to provide features into this project:

* [ViaCep](https://viacep.com.br/): free webservice to query CEP in Brazil, not necessary to create account but don't return latitude and longitude
* [Cep Aberto](https://cepaberto.com/): free webservice to query CEP in Brazil.

## 2. Configuration

There is a file called .env in the root folder. That file holds the global environment default values used trough the application:

```bash
REACT_APP_ENVIRONMENT=development
REACT_APP_BASE_URL=http://0.0.0.0:8000
REACT_APP_SENTRY_DNS=<SENTRY_DNS>
```