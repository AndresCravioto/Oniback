require ('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser   = require('body-parser');
const cors = require('cors');

const app = express();


mongoose
  .connect(process.env.DB_URL, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));

  app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:3000'] // <== this will be the URL of our React app (it will be running on port 3000)
    })
  );

const routes = require('./routes/routes.js');

app.use('/', routes);
app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;