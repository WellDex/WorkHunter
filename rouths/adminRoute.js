const {Router} = require('express');
const auth = require('../middleware/auhtMiddleware');
const User = require('../modules/User');
const Group = require('../modules/Group');
const chalk = require('chalk');

const router = Router();

router.get('/users', auth, async (req, res) => {
  try {
    let users = await User.find();
    users = users
      .filter((u) => String(u.id) !== String(req.user.userId))
      .map((u) => {
        let rating = 0;
        if (u.profile.rating.count > 0 && u.profile.rating.number > 0) {
          rating = u.profile.rating.number / u.profile.rating.count;
        }
        return {
          id: u.id,
          ...u.profile,
          rating,
          isBlocked: u.isBlocked,
        };
      });
    res.json(users);
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.get('/groups', auth, async (req, res) => {
  try {
    let groups = await Group.find();
    res.json(groups);
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.put('/user/block/:id', auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    user.isBlocked = req.body.isBlocked;
    await user.save();
    res.json({message: `Пользователь заблокирован`});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.put('/group/block/:id', auth, async (req, res) => {
  try {
    let group = await Group.findById(req.params.id);
    group.isBlocked = req.body.isBlocked;
    await group.save();
    res.json({message: `Сообщество заблокировано`});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

module.exports = router;
