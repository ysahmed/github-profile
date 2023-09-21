require('dotenv').config();
const { AxiosError } = require('axios');
const app = require('./app');
const { init } = require('./github/github');

process.on('uncaughtException', (e) => {
  //   if (e instanceof AxiosError)
  //     setTimeout(() => {
  //       init();
  //     }, 5000);
  //   else
  console.log('Uncaught Exception', e.message);
});

process.on('unhandledRejection', (ex) => {
  // ? Important should I exit the process!
  console.log('Unhandled Rejection', ex.message);
});

const port = process.env.GHAPPPORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
