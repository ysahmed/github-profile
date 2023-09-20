const app = require('express')();
const router = require('./routes/unifiedRoutes');

app.use('/api/v1', router);

module.exports = app;
