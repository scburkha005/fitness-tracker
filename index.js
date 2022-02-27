// create the express server here
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const client = require('./db/client');

const { PORT = 3000 } = process.env;

app.listen(3000, () => {
  client.connect();
  console.log(`The server is listening on http://localhost:${PORT}`);
});

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// url/api
app.use('/api', require('./api'));

// GET url/
app.get('/', (req, res, next) => {
  res.send("Welcome to the homepage");
});

//Error handling: 404 errors
app.use((req, res, next) => {
  res.status(404).send({
    message: "Page Not Found"
  });
});

//Error handling: 500 errors unless specific 4XX code is given
app.use(({ name, message }, req, res, next) => {
  if (res.statusCode < 400 || res.statusCode >= 500) {
    res.status(500);
  }
  res.send({
    name,
    message
  });
});
