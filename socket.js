const chalk = require('chalk');

module.exports = async function connectionSocket(io) {
  try {
    let users = [];

    const addUser = (userId, socketId) => {
      !users.some((user) => user.userId === userId) &&
        users.push({userId, socketId});
    };

    const removeUser = (socketId) => {
      users = users.filter((user) => user.socketId !== socketId);
    };

    const getUser = (userId) => {
      return users.find((user) => user.userId === userId);
    };

    io.on('connection', (socket) => {
      console.log(chalk.bgGreenBright.bold('a user connected.'));
      socket.on('addUser', (userId) => {
        addUser(userId, socket.id);
      });

      socket.on('sendMessage', ({senderId, receiverId, text}) => {
        const user = getUser(receiverId);
        if (user?.socketId) {
          io.to(user.socketId).emit('getMessage', {
            senderId,
            text,
          });
        }
      });

      socket.on('disconnect', () => {
        console.log(chalk.bgGreenBright.bold('a user disconnected!'));
        removeUser(socket.id);
      });
    });
  } catch (error) {
    console.log(chalk.blueBright.bold(`Socket.io error: ${error}`));
  }
};
