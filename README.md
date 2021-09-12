<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/tguelcan/restexpress">
    <img src="https://fontmeme.com/permalink/210912/b1e8e8d0aa7e65dfe082cd94202d998c.png" alt="Logo">
  </a>

  <h3 align="center">NODEJS Backend Starter</h3>

  <p align="center">
    NODEJS Backend starter is a highly customizable REST backend.
    <br />
    <br />
    ·
    <a href="https://github.com/tguelcan/backend/issues">Report Bug</a>
    ·
    <a href="https://github.com/tguelcan/backend/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Deployment](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project

BACKEND is a highly customizable REST backend starter.

Here's why this is some cool shit:

- Your time should be focused on creating amazing features, not thinking about authentication, user management and project structure.
- You shouldn't have to implement simple CRUD operations over and over again.

Of course, no template will serve all projects since your needs may be different. So we made it easy to add your own mongoose plugins, services and middleware.

### Built With

- [NodeJS](https://nodejs.org)
- [Babel](https://babeljs.io)
- [Fastify](https://www.fastify.io)
- [MongoDB](https://mongodb.com)

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- [yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)
- [mongoDB](https://docs.mongodb.com/manual/installation/)

The easiest way to install mongoDB is with docker. A simple docker-compose file would look like this:

```yml
version: "3.8"
services:
  mongo:
    image: mongo:4.2.5
    ports:
      - "27017:27017"
```

### Installation

2. Clone the repo

```sh
git clone git@github.com:tguelcan/backend.git
```

3. Install dependencies

```sh
yarn
```

4. Enter your variables in `.env.example` and rename the file to `.env`

<!-- USAGE EXAMPLES -->

## Usage

Start the server with:

```sh
yarn run dev
```

If it succesfully started, the output should look like this:
[![yarn run dev screenshot][yarn-run-dev-screenshot]](http://0.0.0.0:8080)

You should now be able to see the [Documentation](http://0.0.0.0:8080/docs)

You can run tests with:

```sh
yarn run test
```

## Adding routes and plugins

### Adding routes

```sh
/src/api/[resource-name]
```

Create a folder in /api and create a index.js file

=> All required files should now be generated and you can start writing code!

1. Define RBAC in /api/resource-name/rbac.js
2. Define model in /api/resource-name/model.js
3. Write tests in /tests/api/resoure-name.test.js
4. Add middleware in /api/resource-name/index.js
5. Implement controllers in /api/resource-name/controller.js

### Plugins

1. Create your new plugin in a separate folder in `src/plugins`
2. Import it when necessary with `~/plugins/yourplugin`

<!-- Deployment -->

## Deployment

### Heroku + MongoDB Atlas = 👁👄👁

1. Create a new heroku app
2. Enter the needed environment variables:

```
JWT_SECRET=
MONGODB_URI=
```

You can get a free mongoDB database from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

3. `heroku git:remote -a <your-app-name>`
4. `git push heroku master`
5. Your API should now be online and accessible under: https://\<your-app-name>.herokuapp.com/ 🥳

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/tguelcan/backend/issues) for a list of proposed features (and known issues)

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Tayfun Gülcan - [@Tayfuuu](https://twitter.com/Tayfuuu)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Img Shields](https://shields.io)
- [README Template](https://github.com/othneildrew/Best-README-Template)
- [Mongoose](https://github.com/Automattic/mongoose)
- [JWT](https://jwt.io/)
- [Swagger](https://swagger.io)
- [AVA](https://github.com/avajs/ava)
- [fastify](https://www.fastify.io)

## recommended sources

//
