const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auhtMiddleware');
const Note = require('../modules/Note');
const User = require('../modules/User');
const Group = require('../modules/Group');
const chalk = require('chalk');

const router = Router();

router.post(
  '/create',
  auth,
  [
    check('text', 'Максимальное количество символов - 500')
      .isLength({max: 500})
      .isString()
      .notEmpty(),
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

      const {text, id, type} = req.body;
      let profile;
      if (type) {
        profile = await Group.findById(id);
      } else {
        const user = await User.findById(req.user.userId);
        profile = user.profile;
      }

      const note = new Note(
        type
          ? {
              text,
              createDate: new Date(),
              refOwner: type,
              user: {
                name: profile.title,
                avatar: profile.avatar,
              },
              owner: id,
            }
          : {
              text,
              createDate: new Date(),
              user: {
                name: `${profile.firstName} ${profile.lastName}`,
                avatar: profile.avatar,
              },
              owner: req.user.userId,
            }
      );

      await note.save();

      res.status(201).json({message: 'Запись создана'});
    } catch (error) {
      console.log(chalk.white.bgRed.bold(error));
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

router.get('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
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

router.put('/like/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);
    if (note.subscribers.includes(req.user.userId)) {
      note.subscribers = note.subscribers.filter(
        (id) => id !== req.user.userId
      );
    } else {
      note.subscribers.push(req.user.userId);
    }

    await note.save();

    res.json();
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
