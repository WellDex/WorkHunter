const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports = async function connection() {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(chalk.green.bgWhite('DB connected'));
  } catch (error) {
    console.log(chalk.red.bgGray.bold(`Mongoose error conection: ${error}`));
  }
};
