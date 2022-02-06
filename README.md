### This is a part of code from the project i did during an internship at Renault digital

# ✨ KSYS POC Project

This application is a graphic interface made in Angluar to manage KSYS database.

> This project was generated with the boilerplate of [Angular](https://angular.io/) project in Renault Digital.

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
