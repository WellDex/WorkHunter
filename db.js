const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports = async function connectionDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    console.log(chalk.white.bgMagenta.bold('DB connected'));
  } catch (error) {
    console.log(chalk.blueBright.bold(`Mongoose error conection: ${error}`));
  }
};
