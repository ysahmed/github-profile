require('dotenv').config();
const app = require('./app');

const port = process.env.GHAPPPORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
