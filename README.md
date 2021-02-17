# SERVER-API

[![Travis](https://img.shields.io/travis/com/justalk/server-api.svg?style=flat-square)](https://travis-ci.com/github/JustalK/server-api)
[![Coverage Status](https://coveralls.io/repos/github/JustalK/SERVER-API/badge.svg?branch=master)](https://coveralls.io/github/JustalK/SERVER-API?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/7e6edeed2150efaa35bd/maintainability)](https://codeclimate.com/github/JustalK/SERVER-API/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7e6edeed2150efaa35bd/test_coverage)](https://codeclimate.com/github/JustalK/SERVER-API/test_coverage)

This project is a fresh starter for creating a **REST API** with all my favorite tools.

The server is using the library `Express` but it can be switch easily in the **server.js** file for Fastify or Restify. The server is linked to the library `Apollo-server` for managing the data with `GraphQL`. The database is handle by `MongoDB` and can also be easily switch in **database.js**.

The models are found in the folder **models**. Their schema are described with `mongoose` and also typed for using `GraphQL`.

The continuous integration is handled with `Travis` and the coverage is checked by `Coveralls` and `Codeclimate` for checking the level of maintainability of the code. Finally, I use `Ava` for making the test cases. For fixing the style, I use `Eslint`.

Before committing, `Husky` will force the tests to be run and will validate or not the new push.

## Plan of the presentation

I explain with all the details how I build the project and my way of working.

1. [ERD](#erd)
2. [Documentation](#documentation)
3. [Organization](#organization)
4. [Development](#development)
5. [Seeding](#seeding)
6. [Testing](#testing)
7. [Admin](#admin)
8. [Monitoring](#monitoring)
9. [Security](#security)
10. [Running](#running)

## ERD

`Graphql-voyager` has been added as a middleware so you can visualize the ERD on the following endpoint : `/erd`

```
http://localhost:5000/erd
```

## Documentation

#### Server documentation

The documentation of the server can be access at this endpoint. It gives information about the server, the tools and how to use the API. Open a browser and go to the following URL :

```
http://localhost:5000/documentation
```

#### Code documentation

The jsdoc can be generated locally with the following command :

```
npm run build:docs
```

#### Online API documentation

The playground of the apollo server is activated, so the documentation and the json format can be access at the endpoint of the api. Open a browser and browse to the following URL :

```
http://localhost:5000/api/graphql
```

#### Local API documentation

Since it's a graphql, anyone can generate the documentation by introspection. I suggest to use this tool `2fd/graphdoc` with the following commands :

```
npm install -g @2fd/graphdoc
graphdoc -e http://localhost:5000/api/graphql -o ./doc/schema
```

A html doc will be then found inside the directory **/doc/schema**.

## Organization

#### Organization of the global folder

| Folder's Name | Description of the folder                               |
| :------------ | :------------------------------------------------------ |
| documentation | Everything related to the documentations                |
| env           | Regroup the global constant of the app                  |
| seeding       | Regroup the seed of the app for populating the database |
| src           | Regroup the source code                                 |
| test          | Regroup the test                                        |

#### Organization of the src folder

| Folder's Name | Description of the folder                               |
| :------------ | :------------------------------------------------------ |
| dbs           | Regroup the direct call to the database                 |
| libs          | Regroup the utils and global functions                  |
| models        | Regroup the models                                      |
| routes        | Regroup the routes if needed                            |
| services      | Regroup the services of the app                         |
| types         | Regroup the types for graphQL                           |

## Development

#### Environment variables

The environment variable are not present in the project but can be found in the `travis.yaml`. Most of them are visible but some are encrypted for Travis to perform his tests.

For encrypting the variables, you will need Travis :

```
gem install travis
```

Then you will need to connect your GitHub account to it. I recommend using GitHub-token.

```
travis login --github-token my_token
```

Where **my_token** is the token you will have generated in `https://github.com/settings/tokens`

For encrypting a value, you just need to use the following command :

```
travis encrypt KEY="value"
```

#### Build email

The email are build with `heml` and `Mustache`. They can be build easily with the following command :

```
npm run build:emails
```

#### Adding new request

The mutations, directives and queries are dynamically added to the graph. For adding a new request, you need to follow the logic under :

- Create a new file in **services** inside the folder **directives**, **mutations** or **queries** depending of your need.
- Those files will be automatically added by the file **apollo.js**.
- Add the new request into the directives, mutations or queries types inside the folder **types**.
- Depedning of your need you might need to create a file inside the **dbs** folder.

#### Pre-commit

`Husky` has been installed and will prevent to push any code that break the project.

## Seeding

For having a database with some data from the start, you can seed it with a single command. It will fill up all the db with dummy data using `mongo-seed`.

```
npm run seed
```

## Testing

For automatic tests, I use `Ava`. All the tests can be run with a single command. The command will also provide details on the coverage.

```
npm run test
```

#### SSH Tunneling

For connecting to the API during the development, I use `localtunnel` for exposing the server through a domain format. The server works on the port 5000, so I use the following commands :

```
npm install -g localtunnel
lt --port 5000 --subdomain couple-api
```

## Admin

The server have a version of `AdminBro` for managing some of the content. Open a browser and go to the following URL :

```
http://localhost:5000/admin
```

**WARNING** : At February 06 2020, the AdminBro in production create a Teaser error with infinite call. The trick is to modify the `env` production or to force the minify to false in the source code.

## Monitoring

The monitoring is enable by default and can be viewed live on the endpoint `/status` :

```
http://localhost:5000/status
```

## Security

#### Helmet

`Helmet` is automatically installed. It will setup the HTTP header of the app aappropriately and will hide some of them for the hacker. Helmet is not perfect but will help with cross-site scripting attack, clickjacking and some others.

## Running

For running the API, a single command is needed. You might want to use the [SSH Tunneling](#ssh-tunneling).

```
npm run start
```

## License

MIT - Copyright &copy; [JUSTAL Kevin](https://teamkd.online/)
