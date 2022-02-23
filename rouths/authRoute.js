const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../modules/User');
const Profile = require('../modules/Profile');
const chalk = require('chalk');

const router = Router();

router.post(
  '/register',
  [
    check('firstName', 'Некорректное имя').trim().isString(),
    check('lastName', 'Некорректная фамилия').trim().isString(),
    check('birthDate', 'Некорректная дата рождения').notEmpty().isString(),
    check('login', 'Некорректный email').trim().isEmail(),
    check('password', 'Минимальная длина пароля 6 символов')
      .trim()
      .isLength({min: 6}),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации',
        });
      }
      const {login, password, firstName, lastName, birthDate} = req.body;

      const candidate = await User.findOne({login});
      if (candidate) {
        return res.status(400).json({message: 'Пользователь существует'});
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        login,
        password: hashedPassword,
      });

      await user.save();

      const profile = new Profile({
        firstName,
        lastName,
        birthDate,
        owner: user._id,
      });

      await profile.save();

      res.status(201).json({message: 'Пользователь создан'});
    } catch (error) {
      console.log(chalk.white.bgRed.bold(error));
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

router.post(
  '/login',
  [
    check('login', 'Некорректный email').trim().isEmail(),
    check('password', 'Минимальная длина пароля 6 символов')
      .trim()
      .isLength({min: 6}),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему',
        });
      }

      const {login, password} = req.body;

      const user = await User.findOne({login});

      if (!user) {
        return res.status(400).json({message: 'Пользователь не найден'});
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({message: 'Некорректные данные при входе в систему'});
      }

      const profile = await Profile.findOne({owner: user._id});
      profile.isOnline = true;
      await profile.save();

      const token = jwt.sign({userId: user.id}, process.env.TOKEN_SECRET, {
        expiresIn: '24h',
      });

      res.json({token});
    } catch (error) {
      console.log(chalk.white.bgRed.bold(error));
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

module.exports = router;
