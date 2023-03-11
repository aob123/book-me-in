## Book-me-in

### Description

Book-me-in is a web based booking application / scheduler. It has been created to assist staff and visitors at a youth center to keep track of the different activities of which the youths wish to partake in. The web app is suited for any situation where there is a need to organise different tasks or activities on a daily basis.

### Technologies

The project has been created with:

- React JS (Vite)
- Express JS
- socket.io
- MongoDB
- Mongoose

### Setup

To run this project, install the server and client locally using npm:

#### Server

```
$ cd ./server
$ npm install
$ npm start
```

#### Client

```
$ cd ./client
$ npm install
$ npm run dev
```

#### Database

The server is setup to use mongodb with a mongoose schema. It uses the default mongodb connection and for time being is not password protected.
Male sure you have mongodb running for your particular OS. You can find the documentation [here](https://www.mongodb.com/docs/manual/administration/install-community/).

The mongostring in index.js can also be edited to use mongodb atlas instead of a local database.

### Usage

After the initial setup and both the server and client are running, the client can be accessed from a browser at localhost:5173
