'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/build', (req, res) => {
  console.log('log req.query:')
  console.log(req.query)
  // console.log(req.query.proto_param)
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`<h1>Hello ${JSON.stringify(req.query)}</h1>`);
  res.end();
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
