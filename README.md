# SERVER-API

This project is a fresh starter for creating a **REST API** with all my favorite tools.

The server is using the library `Fastify` but it can be switch easily in the **server.js** file for Express or Restify. The server is linked to the library `Apollo-server` for managing the data with `GraphQL`. The database is handle by `MongoDB` and can also be easily switch in **database.js**.

The models are found in the folder **models**. Their schema are described with `mongoose` and also typed for using `GraphQL`.

The continuous integration is handled with `Travis` and the coverage is checked by `Coveralls` and `Codeclimate` for checking the level of maintainability of the code. Finally, I use `Ava` for making the test cases. For formatting the code, I use `xo`.

## Plan of the presentation

I explain with all the details how I build the project and my way of working.

1. [ERD](#erd)
2. [Organization](#organization)
3. [Development](#development)
4. [Seeding](#seeding)
5. [Testing](#testing)
6. [Running](#running)

## ERD

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

### Adding new request

The mutations, directives and queries are dynamically added to the graph. For adding a new request, you need to follow the logic under :

- Create a new file in **services** inside the folder **directives**, **mutations** or **queries** depending of your need.
- Those files will be automatically added by the file **apollo.js**.
- Add the new request into the directives, mutations or queries types inside the folder **types**.
- Depedning of your need you might need to create a file inside the **dbs** folder.

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

## Running

For running the API, a single command is needed. You might want to use the [SSH Tunneling](#ssh-tunneling).

```
npm run start
```

## License

MIT - Copyright &copy; [JUSTAL Kevin](https://teamkd.online/)
