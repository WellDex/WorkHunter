const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../modules/User');

const router = Router();

router.post(
  '/register',
  [
    check('firstName', 'Некорректное имя'),
    check('lastName', 'Некорректная фамилия'),
    check('birthDay', 'Некорректная дата рождения'),
    check('email', 'Некорректный email'),
    check('password', 'Минимальная длина пароля 6 символов'),
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
      const {email, password, firstName, lastName, birthDay} = req.body;
      console.log(req.body);

      const candidate = await User.findOne({email});
      if (candidate) {
        return res.status(400).json({message: 'Пользователь существует'});
      }

      const hashedPassword = await bcript.hash(password, 12);

      const user = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        birthDay,
      });

      await user.save();

      res.header('Access-Control-Allow-Origin', '*');
      res.status(201).json({message: 'Пользователь создан'});
    } catch (error) {
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').exists(),
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

      const token = jwt.sign({userId: user.id}, process.env.TOKEN_SECRET, {
        expiresIn: '24h',
      });

      res.json({token});
    } catch (error) {
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

module.exports = router;
