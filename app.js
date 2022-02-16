require('dotenv').config();
const chalk = require('chalk');
const express = require('express');
const cors = require('cors');
// const connectionDB = require('./db');
const fileUpload = require('express-fileupload');

const PORT = process.env.APP_PORT;

const app = express();
app.use(cors());

app.use(express.json({extended: true}));
app.use(fileUpload({}));
app.use('/api/auth', require('./rouths/authRoute'));

app.get('/', (req, res) => {
  res.status(200).json({message: 'Work!!!'});
});

// connectionDB();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(PORT, () =>
  console.log(
    chalk.white.bgMagenta.bold(`Server has been started on port ${PORT}...`)
  )
);
