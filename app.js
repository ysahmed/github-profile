const app = require('express')();
const router = require('./routes/unifiedRoutes');
const { asyncError } = require('./middlewares/asyncError'); // Replace with the correct path to asyncError.js
const { notFoundError } = require('./middlewares/notFoundError');

app.use('/api/v1', router);

app.use(notFoundError);

app.use(asyncError);

module.exports = app;
