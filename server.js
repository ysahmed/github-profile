require('dotenv').config();
const app = require('./app');
const { init } = require('./github/github');

init();

const port = process.env.GHAPPPORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
