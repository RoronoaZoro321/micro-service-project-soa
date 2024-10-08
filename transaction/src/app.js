const express = require('express');
const startSoapServer = require('./controllers/controller');

const app = express();

startSoapServer(app);

module.exports = app;
