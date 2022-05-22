const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auhtMiddleware');
const Note = require('../modules/Note');
const chalk = require('chalk');

const router = Router();

router.post(
  '/create',
  auth,
  [
    check('text', 'Максимальное количество символов - 500')
      .isLength({min: 1, max: 500})
      .isString(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при создании записи',
        });
      }

      const {text} = req.body;

      const note = new Note({
        text,
        createDate: new Date(),
        owner: req.user.userId,
      });

      await note.save();

      res.status(201).json({message: 'Запись создана'});
    } catch (error) {
      console.log(chalk.white.bgRed.bold(error));
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const id = req.body.id || req.user.userId;
    const notes = await Note.find({owner: id});
    res.json(
      notes.sort((a, b) => {
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
  [check('id', 'Отсутствует id записи').isLength({min: 1})],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные записи',
        });
      }
      const {id} = req.params;

      const note = await Note.findById(id);

      await note.delete();

      res.status(201).json({message: 'Запсиь удалена'});
    } catch (error) {
      console.log(chalk.white.bgRed.bold(error));
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

router.delete('/deleteAll', auth, async (req, res) => {
  try {
    await Note.deleteMany(Note.find({owner: req.user.userId}));

    res.status(201).json({message: 'Записи удалены'});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

module.exports = router;
