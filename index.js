// create the express server here
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');

const client = require('./db/client');

const { PORT = 3000 } = process.env;

app.listen(3000, () => {
  client.connect();
  console.log(`The server is listening on http://localhost:${PORT}`);
});

app.get('/', (req, res, next) => {
  res.send("Welcome to the homepage");
})