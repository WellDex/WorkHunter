const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auhtMiddleware');
const {check, validationResult} = require('express-validator');
const User = require('../modules/User');
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
        profile: {
          firstName,
          lastName,
          birthDate,
        },
        createDate: new Date(),
      });

      await user.save();

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

      if (user.isBlocked) {
        return res.status(400).json({message: 'Пользователь заблокирован!'});
      }

      user.profile.isOnline = true;
      await user.save();

      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: '24h',
        }
      );

      res.json({
        token,
        id: user.id,
        firstName: user.profile.firstName,
        avatar: user.profile.avatar,
      });
    } catch (error) {
      console.log(chalk.white.bgRed.bold(error));
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

router.post('/logout', auth, async (req, res) => {
  try {
    const id = req.body.id || req.user.userId;
    const user = await User.findById(id);

    user.profile.isOnline = false;
    await user.save();

    res.status(200).json();
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.post('/auth', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(400).json({message: 'Пользователь не найден'});
    }

    if (user.isBlocked) {
      return res.status(400).json({message: 'Пользователь заблокирован!'});
    }

    user.profile.isOnline = true;
    await user.save();

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '24h',
      }
    );

    res.json({
      token,
      id: user.id,
      firstName: user.profile.firstName,
      avatar: user.profile.avatar,
    });
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

module.exports = router;
