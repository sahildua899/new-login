const express = require('express');
const api = require('./src/routes/api');
const app = express();
const path = require('path');
require('dotenv').config()
const normalRouter = require('./src/routes/normal');
require('./src/db/conn')
const staticPath = path.join(__dirname, 'public')
app.use(express.static(staticPath));
app.use(express.json())
app.set('view engine', 'html');
app.use('/api', api);
app.use('/', normalRouter)

module.exports = app;