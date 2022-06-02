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
      .isLength({max: 250})
      .isString()
      .notEmpty(),
    check('link', 'Отсутствует ссылка на проект').notEmpty().isString(),
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
    } catch (error) {
      console.log(chalk.white.bgRed.bold(error));
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

router.get('/:id', auth, async (req, res) => {
  try {
    const {top} = req.query;
    let projects;
    let count;
    if (Object.keys(req.query).length > 0) {
      projects = await Portfolio.find({owner: req.params.id}).limit(
        top ? top : ''
      );
    } else {
      projects = await Portfolio.find({owner: req.params.id});
    }

    if (Object.keys(req.query).includes('count')) {
      count = await Portfolio.find({owner: req.params.id}).count();
    }
    res.json(
      count
        ? {
            portfolio: projects.sort((a, b) => {
              const date1 = new Date(a.createDate);
              const date2 = new Date(b.createDate);

              return date2 - date1;
            }),
            count,
          }
        : projects.sort((a, b) => {
            const date1 = new Date(a.createDate);
            const date2 = new Date(b.createDate);

            return date2 - date1;
          })
    );
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.delete(
  '/delete/:id',
  [check('id', 'Отсутствует id записи').notEmpty()],
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
    } catch (error) {
      console.log(chalk.white.bgRed.bold(error));
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

router.delete('/deleteAll', auth, async (req, res) => {
  try {
    await Portfolio.deleteMany(Portfolio.find({owner: req.user.userId}));

    res.status(201).json({message: 'Проекты удалены'});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

module.exports = router;
