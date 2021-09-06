# README

## _Projects and Task Sample App_

This is a sample app for testing purpose. This app use the MERN stack and Typescript.

## Features

- CRUD for PROJECTS
- CRUD for TASKS
- Mark project as done
- Mark task as done

In the backend use [Nodemon] for development and [Dotenv] for load environment settings.

## Technologies

App divided in two main modules, the backend and the frontend app.

The backend it's a [Nodejs] + [Expresss] + [Mongo]
application that use several plugins/libraries like Nodemon, Dotenv, Mongoose, Cors, Helmet, Morgan, Winston.

The frontend it's a [React] + [RTK] (Redux toolkit) application, this use several libraries/plugins like React icons,
React Bootstrap, React router dom and React thunk.


> Note: I'm using [Typescript] for both.

| Plugin | Description |
| ------ | ------ |
| [Mongo] | Community version for the database layer |
| [Express] | Using in the backend |
| [Nodejs] | Using in the backend |
| [React] | Using in the frontend |
| [RTK] | Using in the frontend for manage state |

## Installation

Install all dependencies in package.json for the backend and frontend, then build and run the code.

```sh
npm install 
npm run start:prod
```

## License

Apache License 2.0

**Free Software, Hell Yeah!**

[Typescript]: https://www.typescriptlang.org/

[React]: https://reactjs.org/

[Mongo]: https://www.mongodb.com/

[Express]: https://expressjs.com/

[Nodejs]: https://nodejs.org/

[Nodemon]: https://nodemon.io/

[Dotenv]: https://github.com/motdotla/dotenv#readme

[RTK]: https://redux-toolkit.js.org/