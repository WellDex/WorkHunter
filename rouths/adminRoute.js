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

router.put('/block', auth, async (req, res) => {
  try {
    let user = await User.findById(req.body.id);
    user.isBlocked = true;
    res.json().json({message: `Пользователь заблокирован`});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

module.exports = router;
