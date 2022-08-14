const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auhtMiddleware');
const User = require('../modules/User');
const chalk = require('chalk');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

const router = Router();

router.get('/friends', auth, async (req, res) => {
  try {
    const id = req.user.userId;
    const user = await User.findById(id);

    res.status(200).json(user.profile.friends);
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.put(
  '/update',
  auth,
  [check('profile', 'Некорректная информацыя профиля').notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные профиля',
        });
      }
      const id = req.body.id || req.user.userId;
      const user = await User.findById(id);
      user.profile = {...user.profile, ...req.body.profile};
      await user.save();
      res.status(201).json({message: 'Профиль обновлен'});
    } catch (error) {
      console.log(chalk.white.bgRed.bold(error));
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

router.put('/avatar', auth, async (req, res) => {
  try {
    const id = req.body.id || req.user.userId;
    const {img} = req.files;
    const user = await User.findById(id);
    const fileName = uuid.v4() + '.jpg';
    img.mv(path.resolve(__dirname, '..', 'static', 'avatars', fileName));
    if (user.profile.avatar) {
      fs.unlinkSync(`static/avatars/${user.profile.avatar}`);
    }
    user.profile.avatar = fileName;
    await user.save();
    res.status(201).json({message: 'Аватар обновлен'});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.put('/rating', auth, async (req, res) => {
  try {
    const id = req.body.userId;
    const user = await User.findById(id);
    user.profile.rating = {
      count: user.profile.rating.count + 1,
      number: user.profile.rating.number + req.body.rating,
    };
    await user.save();
    res.status(201).json({message: 'Рейтинг обновлен'});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id || req.user.userId;
    const user = await User.findById(id);

    let rating = 0;
    if (user.profile.rating.count > 0 && user.profile.rating.number > 0) {
      rating = user.profile.rating.number / user.profile.rating.count;
    }

    res.status(200).json({...user.profile, rating, isBlocked: user.isBlocked});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

module.exports = router;
