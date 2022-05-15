const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auhtMiddleware');
const User = require('../modules/User');
const chalk = require('chalk');

const router = Router();

router.get('/', auth, async (req, res) => {
  try {
    const id = req.body.id || req.user.userId;
    const user = await User.findById(id);

    res.status(200).json(user.profile);
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.post(
  '/update',
  auth,
  // [!check('profile', 'Некорректная информацыя профиля').isEmpty()],
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
      console.log('body', req.body.profile);
      console.log('user', user.profile);
      await user.save();
      res.status(200).json({message: 'Профиль обновлен'});
    } catch (error) {
      console.log(chalk.white.bgRed.bold(error));
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

module.exports = router;
