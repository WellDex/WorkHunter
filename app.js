require('dotenv').config();
const chalk = require('chalk');
const express = require('express');
const app = express();
const cors = require('cors');
const connectionDB = require('./db');
const connectionSocket = require('./socket');
const fileUpload = require('express-fileupload');
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

const PORT = process.env.APP_PORT;

app.use(cors());

app.use(express.json({extended: true}));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.static(path.resolve(__dirname, 'static/avatars')));
app.use(express.static(path.resolve(__dirname, 'static/portfolio')));
app.use(express.static(path.resolve(__dirname, 'static/gallery')));
app.use(fileUpload({}));

app.use('/api', require('./rouths/index'));
app.get('/', (req, res) => {
  res.status(200).json({message: 'Work!!!'});
});

connectionDB();
connectionSocket(io);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

server.listen(PORT, () =>
  console.log(
    chalk.white.bgMagenta.bold(`Server has been started on port ${PORT}...`)
  )
);
