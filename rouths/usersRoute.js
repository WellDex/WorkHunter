const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auhtMiddleware');
const User = require('../modules/User');
const chalk = require('chalk');

const router = Router();

router.get('/all', auth, async (req, res) => {
  try {
    let users = await User.find();
    users = users
      .filter((u) => String(u.id) !== String(req.user.userId))
      .map((u) => ({
        id: u.id,
        firstName: u.profile.firstName,
        lastName: u.profile.lastName,
        status: u.profile.status,
      }));
    res.json(users);
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.get('/friends/:id', auth, async (req, res) => {
  try {
    const {top} = req.query;
    const user = await User.findById(req.params.id);
    let friends;
    if (Object.keys(req.query).length > 0) {
      friends = await User.find()
        .where('_id')
        .in(user.profile.friends)
        .limit(+top);
    } else {
      friends = await User.find().where('_id').in(user.profile.friends);
    }
    friends =
      friends.length > 0
        ? friends.map((f) => ({
            id: f.id,
            firstName: f.profile.firstName,
            lastName: f.profile.lastName,
            status: f.profile.status,
            img: null,
          }))
        : [];
    res.json(friends);
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.post('/follow/:id', auth, async (req, res) => {
  try {
    const user = await User.findById({_id: req.user.userId});
    if (!user.profile.friends.includes(req.params.id)) {
      user.profile.friends.push(req.params.id);
      await user.save();
    }
    res.json();
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.post('/unfollow/:id', auth, async (req, res) => {
  try {
    const user = await User.findById({_id: req.user.userId});
    if (user.profile.friends.includes(req.params.id)) {
      user.profile.friends = user.profile.friends.filter(
        (f) => f !== req.params.id
      );
      await user.save();
    }
    res.json();
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

module.exports = router;
