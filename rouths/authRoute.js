const {Router} = require('express');
const bcrypt = require('bcryptjs');
const token = require('token');
const {check, validationResult} = require('express-validator');

const router = Router();

router.post('/register'),
  [
    check('name', 'Некорректное имя').isString(),
    check('lastName', 'Некорректная фамилия').isString(),
    check('birthDay', 'Некорректная дата рождения').isDate(),
    check('login', 'Некорректный login').isLength({min: 6}).isString(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6}),
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
      const {} = req.body;
    } catch (error) {
      res.status(500).json({message: `Server error: ${error}`});
    }
  };

router.post(
  '/login',
  [
    check('login', 'Некорректный login').isLength({min: 6}).isString(),
    ,
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
          .json({message: 'Неверный пароль, попробуйте снова'});
      }
      //todo
      const token = jwt.sign({userId: user.id}, config.get('jwtSecret'), {
        expiresIn: '1h',
      });

      res.json({
        token,
        userId: user.id,
        email: user.email,
        isBanned: user.status,
      });
    } catch (error) {
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);
