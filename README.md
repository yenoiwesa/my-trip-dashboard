# My NSW Trip Dashboard

A small server and web app to create a personal NSW Transport trip monitor.

## Setup

The project uses `node.js` version 10+ and `npm`.
Execute `npm install` to retrieve all dependencies.

In order to run the server, you must first obtain a valid API Key from the [NSW Transport Open Data website](https://opendata.transport.nsw.gov.au).
The API Key must allow you access to the Trip Planner APIs.

The API Key will be read by the server from the `TRANSPORT_API_KEY` environment variable.

## Development

To start the development server, you must separately start the UI single page app dev server and the node.js backend:

1. Execute `cd app && npm run start` to start the React.JS dev server at `localhost:3000`.

2. Execute `npm run start` to start the node.js backend.

Note that you will be required to pass a `TRANSPORT_API_KEY` environment variable for the process to read.

## Build & Start

To start the production version of the server, you must first build the single page app with `npm run build`.

Then, you can start the node.js server with `npm run start`. The website will be available at `localhost:8080`.

It is possible to change the default port number by passing the `port` argument: `npm run start -- --port=9090`.

Note that you will be required to pass a `TRANSPORT_API_KEY` environment variable for the process to read.

---

By Matthieu Di Berardino
