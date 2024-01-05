# Challenge 3
## Overview

This is a REST API made with TypeScript as the third challenge in the Compass Uol's internship program.
## Local Deployment Setup
### Prerequisites
  - [MongoDB Atlas Account](https://www.mongodb.com/docs/atlas/tutorial/create-atlas-account/) and [Cluster](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/)
  - [NodeJS](https://nodejs.org)
### Installation

1. Clone the GitHub repository in the desired folder with `git clone https://github.com/bruno-ortigosa-cruz/challenge-03` or download the zip file

2. Enter the project folder

3. Install the dependencies with the command of your choice:
```sh
> yarn
> npm install
```

### Configuration

1. Create a `.env` file on the root folder (in the same level as `package.json`, `README.md`, etc.), there is a `.env.example` to fill if necessary, just duplicate it and rename it to `.env`
2. Get the [Database URI](www.mongodb.com/docs/manual/reference/connection-string/)
3. Set the variables as below replacing the `<>` fields with your information:
```
MONGO_URI='<your db URI>'
PORT=<choose your port>
SECRET_KEY='<your secret key>'
```
**Example:**
```
MONGO_URI='mongodb+srv://my_username:my_password@cluster.options.mongodb.net/db_name'
PORT=3000
SECRET_KEY='SECRET'
```
> ***Note***: if `PORT` is not defined, it is set to `3000` automatically

### Deployment

After all the configuration is set up
1. Enter the `challenge-03` folder
2. Run `yarn build` or `npm run build` command to compile
3. Run `yarn start` or `npm run start` to start the server
4. If you want to test it with swagger enter the URL `localhost:<PORT>/api-docs/` (change `<PORT>` to your port (default `3000`))

### Scripts
| Script          | Description                                               |
| --------------- | --------------------------------------------------------- |
| `build`         | Compiles the TypeScript files                             |
| `start`         | Runs the server                                           |
| `dev`           | Runs tsc-watch library to keep watch on your file changes |
| `lint`          | Runs ESLint                                               |
| `test`          | Runs jest                                                 |
| `test:verbose`  | Runs jest in verbose mode                                 |
| `test:coverage` | Runs the jest coverage on all /src files                  |

## Render Deploy
The project is deployed on Render [here](https://challenge-03.onrender.com/)

When entering the link it will redirect you for the home page, where you can go to the swagger documentation

> ***Note***: when you first enter the website there might be up to 1 minute delay for it to get off inactivity

## API Endpoints

The endpoints refer to <>

| Auth | Method | Endpoint         | Referent to | Description                               |
| ---- | ------ | ---------------- | ----------- | ----------------------------------------- |
| ---- | POST   | `/users/sign-up` | **User**    | Add a new user                            |
| ---- | POST   | `/users/sign-in` | **User**    | Log in of an existing user                |
| JWT  | GET    | `/events`        | **Event**   | Get events                                |
| JWT  | POST   | `/events`        | **Event**   | Create an event                           |
| JWT  | DELETE | `/events`        | **Event**   | Delete events from a specific day of week |
| JWT  | GET    | `/events/:id`    | **Event**   | Get event from a specific id              |
| JWT  | DELETE | `/events/:id`    | **Event**   | Delete event from a specific id           |

> ***Note***: Routes with JWT authentication are only accessible after sign in and obtention of the Bearer Token
