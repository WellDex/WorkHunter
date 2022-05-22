const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auhtMiddleware');
const Portfolio = require('../modules/Portfolio');
const chalk = require('chalk');

const router = Router();

router.post(
  '/create',
  auth,
  [
    check('title', 'Максимальное количество символов - 250')
      .isLength({min: 1, max: 250})
      .isString(),
    check('link', 'Отсутствует ссылка на проект').isLength({min: 1}).isString(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при добавлении проекта в портфолио',
        });
      }
      //todo
      const {title, link} = req.body;

      const portfolio = new Portfolio({
        title,
        link,
        createDate: new Date(),
        owner: req.user.userId,
      });

      await portfolio.save();

      res.status(201).json({message: 'Запись создана'});
    } catch (e) {
      console.log(chalk.white.bgRed.bold(error));
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const id = req.body.id || req.user.userId;
    const portfolios = await Portfolio.find({owner: id});
    res.json(
      portfolios.sort((a, b) => {
        const date1 = new Date(a.createDate);
        const date2 = new Date(b.createDate);

        return date2 - date1;
      })
    );
  } catch (e) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.delete(
  '/delete/:id',
  [check('id', 'Отсутствует id записи').isLength({min: 1})],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные проекта',
        });
      }
      const {id} = req.params;

      const portfolio = await Portfolio.findById(id);

      await portfolio.delete();

      res.status(201).json({message: 'Проект удален'});
    } catch (e) {
      console.log(chalk.white.bgRed.bold(error));
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

router.delete('/deleteAll', auth, async (req, res) => {
  try {
    await Portfolio.deleteMany(Portfolio.find({owner: req.user.userId}));

    res.status(201).json({message: 'Проекты удалены'});
  } catch (e) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

module.exports = router;
