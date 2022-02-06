### This is a part of code from the project i did during an internship at Renault digital

# ✨ KSYS POC Project

This application is a graphic interface made in Angluar to manage KSYS database.

> This project was generated with the boilerplate of [Angular](https://angular.io/) project in Renault Digital [https://gitlabee.dt.renault.com/shared/boilerplate/app-angular.git](https://gitlabee.dt.renault.com/shared/boilerplate/app-angular.git).

## 🕹 Technical Stack

| Angular | Typescript | date-fns | Ngrx   | Karma | Cypress |
| ------- | ---------- | -------- | ------ | ----- | ------- |
| 12.2.12 | 4.4.4      | 2.25.0   | 12.5.1 | 6.3.6 | 8.7.0   |

## 🚀 Launch the project

To use this application, you'll need the Back-end named sysconfig-crud because the Front use an API to communicate with ksys's database.<br>
Do everything needed to set up this Back-end.<br>

To lunch the project, you'll need to run in your sysconfig-crud project :

```shell
npm start
```

This sould get the Api ready on port 3000.

Then you'll be able to run in the Angular application :

```shell
ng serve
```

If you get CORS error add some code in your sysconfig-crud project.<br>
I personally added the next code in "server.ts" to get ride of this error but feel free to make a better version than mine.

```shell
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    //* le console log est ici car Typescript n\'aime pas le fait que "req" ne soit pas réellement utilisé
    console.log(req.readableObjectMode);
    // Pass to next layer of middleware
    next();
  });
```

## Maintainability

The main code of the application is placed in src/app/modules/home

### New table

If there is a new table in the database, just go to the url http://localhost:4200/home/data/{url-of-the-api} <br>
For exemple : http://localhost:4200/home/data/contributors-services <br>
Datas from the table should appear.

### Add pre filled data proposition

In constantData.ts you can update the "PrefilledOptionsArray" variable and add a new element in wanted array (make sure that the database can accept this value)<br>
You also can create a new proposition for a table, make sure to also add this element in table-data.component.ts in "PrefilledOptionsArray" variable if it isn't already the case.

```shell
# in constantData.ts
  environments: {
    ...
    type: ['DEV', 'STG', ... , 'NewElement'],
  },

# in table-data.component.ts
    this.optionsObjectProposition = {
      ...
      type: [],
    };
```

### Create a new selection possibility of already existant ids

In constantData.ts : "IdsUrl" object <br>

```shell
  'contributors-module-instances': [
    ['contributors', 'module-instances'],
    ['contributorId', 'moduleInstanceId'],
  ],
```

For a specific table (for exemple 'contributors-module-instances'), you create 2 arrays : <br>

- In the first one, you specify urls of the different tables from which you want ids proposition.<br>
  For exemple : ['contributors', 'module-instances'],
- For the other table, it's the name of the field in which you will show ids. <br>
  For exemple : ['contributorId', 'moduleInstanceId'], <br>
  Make sure that in table-data.component.ts, in "optionsObjectId" variable, the field name is present
  ```shell
    this.optionsObjectId = {
      ...
      moduleInstanceId: [],
      contributorId: [],
    };
  ```

## 🚀 Quick Start

Firstly, check if you have [Git](https://git-scm.com/) installed in your machine:

```shell
git --version
```

Upgrade NodeJS to the latest LTS version, `16.13.0` for now. You can use:

```shell
nvm install --lts && nvm use --lts
```

You could check it by:

```shell
node --version
```

Then clone the repository:

```shell
git clone https://gitlabee.dt.renault.com/IRN-69640/sysconfig-admin.git && cd app-angular
```

Next install all dependencies:

```shell
npm install
```

You can run the project locally:

```shell
# run locally
npm run start
# run with a docker
npm run dev:up
```

You can also start the project with a mock back end by [json-server](https://github.com/typicode/json-server):

```shell
npm run start:mock
```

Or in containers [Docker](https://www.docker.com/):

```shell
# build the app
npm run build
# with docker, in container
npm run dev:up
# do not forget to take down
npm run dev:down
```

Finally, the application will be served on `http://localhost:4200/` by default, enjoy !

In addition, you can also generate reports by running:

```shell
npm run reports
```

Open it with command:

```
npm run reports:open
```

Work hard and have fun.

## Table of contents

- [AppAngular](#appangular)
  - [🚀 Quick start](#🚀-quick-start)
  - [Table of contents](#table-of-contents)
  - [How to work in development mode](#how-to-work-in-development-mode)
    - [Hosts](#hosts)
    - [NODE/NPM](#NODE-/-NPM)
    - [Install dependencies](#install-dependencies)
    - [Setup artifactory](#setup-artifactory)
    - [Launch the stack](#launch-the-stack)
    - [Run the app](#run-the-app)
    - [Code reloading](#code-reloading)
  - [Development server](#development-server)
  - [Code scaffolding](#code-scaffolding)
  - [Build](#build)
  - [Adding custom svg icons](#adding-custom-svg-icons)
  - [Test](#test)
    - [Lint ts & scsss](#lint-ts-&-scsss)
    - [Running unit tests](running-unit-tests)
    - [Running end-to-end tests](#running-end-to-end-tests)
    - [✏️ Test vulnerabilities / licences / sourcemap](#✏️-test-vulnerabilities-/-licences-/-sourcemap)
    - [🔎 View test reports](#🔎-view-test-reports)
    - [🎁 prettier](#🎁-prettier)
    - [🔥 conventionnal commit](#🔥-conventionnal-commit)
    - [🎖 Review and Merge](#🎖-review-and-merge)
  - [Release Management](#release-management)
  - [How to contribute](#how-to-contribute)
  - [Further help](#further-help)

## How to work in development mode

These instructions will get you a copy of the project up and running on your local machine for development and tests purposes.

You can find all the project dependencies in package.json.<br>
The main components and technologies used here are: npm, javascript, angular cli, angular, rxjs, docker, gitlab cicd, karma, jasmine, cypress, cucumber.

### Hosts

You have to add in your hosts file an alias to keycloak hostname.

For Linux and Mac OS, you have to add this line to `/etc/hosts`

```text
127.0.0.1 keycloak
```

For Windows, you have to add this line to `C:\Windows\System32\Drivers\etc\hosts`

```text
127.0.0.1 keycloak
```

### NODE/NPM

Open the Terminal App and install node via Brew

```bash
brew update
brew install node
```

Make sure you have Node and NPM installed by running

```bash
node -v
npm -v
```

If you need to manage multiple active node.js versions, you can use NVM

`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash`

### Install dependencies

Run `npm install` to download dependencies of the project

### Setup artifactory

Make sure you set up \$ARTIFACTORY_USERNAME and \$ARTIFACTORY_ACCESS_TOKEN in your environment.

Log in into [Artifactory](https://artifactory.dt.renault.com) with your ipn, click on your ipn link up right and generate an API Key. This will be the value you should put into \$ARTIFACTORY_ACCESS_TOKEN env variable.

Then run the following script in the project's root directory:

```script shell
./scripts/setupArtifactory.sh
```

This will generate the .npmrc file in the project's root folder. The file won't be commited to git.
This operation will be executed only once, at the beginning.

## Setup the OpenId config for production

Please note that you should use your correct configuration regarding the authentication part.
**config-map.yaml** inside **k8s** should contain your correct values.

### Launch the stack for local dev

```script shell
npm run dev
```

This will:

1. build the app and launch a docker container containing it
2. launch a keycloak server
3. launch the OIDC Httpd container

### Run the app

Open your browser and type <http://localhost>
Use test/test credentials when prompted. If you need to edit/create accounts, you can modify the keycloak/\*.json file and rebuild the keycloak image.

### Code reloading

The app will automatically rebuild if you change any of the source files. You will still have to reload manually the page.

## Development server

Run `ng serve` or `npm run start` for a dev server. Navigate to <http://localhost:4200/>. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/app-angular/` directory.

## Adding custom svg icons

Place an SVG icon in the `assets/icons` directory (create a new sub directory if required).
Import the icon into the custom icons registry service (shared/services/custom-icons-registry.service):

```
iconRegistry.addSvgIcon('iconName', sanitizer.bypassSecurityTrustResourceUrl(`${CustomIconsRegistryService.NAVIGATION_ICON_PATH}/iconName.svg`));
```

It will now be globally accessible by mat-icon with the svgIcon attribute, example `<mat-icon svgIcon="iconName"></mat-icon>`.

## TEST

### Lint ts & scsss

Scan scripts for common issues and errors, and give back a report with line numbers and what to do to fix things.
In addition to actual bugs and errors, it's also check for subjective, stylistic preferences as well.

```bash
npm run test:lint
```

### Running unit tests

Only test a single part of our implementation. A unit. No dependencies or integrations, no framework specifics.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

```bash
# you can also run
npm run test:unit

# dont need a browser
npm run test:unit:browserless

# want the coverage then run
npm run test:unit:coverage

# open the coverage report file
npm run test:unit:open:coverage
```

Coverage reports are generated into `coverage/` directory.

### Running end-to-end tests

To execute the end-to-end tests via [Cypress](https://www.cypress.io/):

You have 3 options

OPTION 1

- In one terminal, run `npm run start:mock` or `npm run start` to start local environment
- In a second terminal, run `test:e2e:debug` or `test:e2e` if you test the app in a docker container

OPTION 2

You can also only just run `test:e2e:run:mock`, it will:

- run a local server
- run your angular app @ port 4300
- wait fo your app to be ready and then
- run cypress
- run the test
- exit with code SIGTERM

OPTION 3

Run the end-to-end tests with docker compose, just like in the CI run `scripts/ci-teste2e.sh`

For more detail, see [the dedicated README](./e2e/README.md)

### ✏️ Test vulnerabilities / licences / sourcemap

Check if licences are up to date

> npm run test:licenses

Test vulnerabilities

> npm run test:vulnerabilities

Test bundle size

> npm run build:analyze

Generate reports

> npm run reports

### 🔎 View test reports

You can view tests report by visiting the [public pages](https://irn-70614.gitlab-pages.dt.renault.com/webapps/lineup-app/) on gitlabee

### 🎁 prettier

It removes all original styling and ensures that all outputted code conforms to a consistent style.
It takes all code and reprints it from scratch by taking the line length into account.
https://prettier.io/

```bash
# check code style
npm run prettier:check

# fix code style
npm run prettier:write
```

### 🔥 conventional commit

A specification for adding human and machine-readable meaning to commit messages

https://www.conventionalcommits.org/

Each commit trigger a hook which check the commit message format:

    > <type>[optional scope]: <description>
    >
    > [optional body]
    >
    > [optional footer(s)]

For more info see .commitlintrc.js file

Hooks are located in .huskyrc.json file

Husky run lint, prettier and unit test for each commit

If you have an issue with Husky, you could run:

`npx husky-init`

## 🎖 Review and Merge

Remove WIP status from merge request and start review process before merge it into INTEGRATION branch.

A good practice is to invite other reviewer to comment and improve changes collaboratively on the merge request until it's approbation.

## Release management

The deliverable is always a docker image.

The build on develop branch always produce a latest image.
The latest image is deployed automatically by the pipeline in a development environment (kube cluster).

A manual task is provided in the pipeline (only on develop branch) allowing to perform a release.
The release process uses npm release utility and creates a git tag and bumps the following version according to semver.

The newly created tag builds automatically and produces a docker image tagged with the release number.
The tagged docker image could be deployed in the selected environment by launching the appropriate pipeline job.

## How to contribute

Do you want to evolve this project ? Your are more than welcome :-)

Take a look in our [code of condute to contribute](CONTRIBUTING.md) and the process for submitting pull requests to us.

Do you like this boilerplate ? So like this repository to follow new updates.

## Further, help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
