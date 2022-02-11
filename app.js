require('dotenv').config();
const chalk = require('chalk');
const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();

const PORT = process.env.APP_PORT;

app.use(cors());
app.use(express.json({extended: true}));

connection();

app.use('/app/auth', require('./rouths/authRoute'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(PORT, () =>
  console.log(
    chalk.white.bgMagenta.bold(`Server has been started on port ${PORT}...`)
  )
);
