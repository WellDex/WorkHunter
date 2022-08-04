const {Router} = require('express');
const auth = require('../middleware/auhtMiddleware');
const Message = require('../modules/Message');
const Chat = require('../modules/Chat');
const User = require('../modules/User');
const chalk = require('chalk');

const router = Router();

//chat
router.get('/chat/users', auth, async (req, res) => {
  try {
    let chats = await Chat.find({members: {$in: [req.user.userId]}});
    chats = chats.map((chat) =>
      chat.members.find((id) => id !== req.user.userId)
    );
    const user = await User.find().where('_id').in(chats);
    res.status(200).json(
      user.map((user) => ({
        _id: user._id,
        avatar: user.profile.avatar,
        name: `${user.profile.firstName} ${user.profile.lastName}`,
      }))
    );
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.get('/chat/:id', auth, async (req, res) => {
  try {
    const chat = await Chat.find({members: {$in: [req.params.id]}});
    res.status(200).json(chat);
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.post('/chat/create', auth, async (req, res) => {
  try {
    const candidate = await Chat.findOne({
      members: [String(req.body.id), String(req.user.userId)],
    });
    if (candidate) {
      return res.status(200).json({id: candidate._id});
    }
    const chat = new Chat({
      members: [req.body.id, req.user.userId],
      createDate: new Date(),
    });
    const saveChat = await chat.save();
    res.status(201).json({id: saveChat._id});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

//message
router.get('/message/:chatId', auth, async (req, res) => {
  try {
    const messages = await Message.find({chatId: req.params.chatId});
    res.status(200).json(messages);
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.post('/message/create', auth, async (req, res) => {
  try {
    const message = new Message({
      ...req.body,
      sender: req.user.userId,
      createDate: new Date(),
    });
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

module.exports = router;
