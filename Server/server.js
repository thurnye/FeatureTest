const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
require('dotenv').config();

require('dotenv').config();
const db = require('./DataBase/index');
const route = require('./Routes/routes');

const PORT = process.env.PORT || 9000;
const app = express();
app.use(logger('dev'));
app.use(express.json());

app.use(express.json());

//SETTING HEADER FOR ACCESS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, CREATE, DELETE, DESTROY'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(route);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
