# gag-frontend

Frontend application for Le GAG's website.

It's based on Vue.js and retrieves data from a REST API.


## Build Setup

```sh
# Install dependencies
npm install

# Serve with hot reload at localhost:45978
npm run dev
```


## Environment-specific configuration

All environment-specific configuration is handled with environment variables, at build time 
(when `npm run build` is run).

You can also set them in the _environments/*.env_ files.

Here are the environment variables in use:

| Variable name    | Required?  | Description                                                       |
| ---------------- | :--------: | ----------------------------------------------------------------- |
| BACKEND_ENDPOINT | Yes        | The backend API endpoint <br> ex: https://backend.gag.fr/api/1.1/ |


## Deployment

This project is deployed using [deployator](https://www.npmjs.com/package/deployator).

The main configuration file is _/deployment/deployment-config.js_: it contains common deployment configuration 
(everything that isn't environment-specific or too sensitive to be committed).

Deployment environment-specific configuration can be set in git-ignored files under: _/deployment/environments/_.

## NPM scripts

A few NPM scripts are available:

  * `npm run lint`: lint the project using eslint
  * `npm run deploy`: build, optimize and deploy the project to the production server
