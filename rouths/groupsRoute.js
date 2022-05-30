const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auhtMiddleware');
const Group = require('../modules/Group');
const User = require('../modules/User');
const chalk = require('chalk');

const router = Router();

router.post(
  '/create',
  auth,
  [
    check('title', 'Некорректное название сообщества').notEmpty(),
    check('description', 'Максимальное количество символов - 500')
      .trim()
      .isLength({
        max: 500,
      }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при создании сообщества',
        });
      }

      const {title, description} = req.body;

      const group = new Group({
        title,
        description,
        createDate: new Date(),
        owner: req.user.userId,
      });

      await group.save();

      const user = await User.findById(req.userId);
      user.profile.groups.push(group._id);
      await user.save();

      res.status(201).json({message: 'Сообщество создано'});
    } catch (error) {
      console.log(chalk.white.bgRed.bold(error));
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

router.put(
  '/update/:id',
  auth,
  [
    check('title', 'Некорректное название сообщества').notEmpty(),
    check('description', 'Максимальное количество символов - 500')
      .trim()
      .isLength({
        max: 500,
      }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при обновлении сообщества',
        });
      }

      const {title, description} = req.body;

      let group = await Group.findById(req.params.id);

      group.title = title;
      group.description = description;

      await group.save();

      res.status(201).json({message: 'Сообщество обновлено'});
    } catch (error) {
      console.log(chalk.white.bgRed.bold(error));
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

router.get('/all', auth, async (req, res) => {
  try {
    let groups = await Group.find();
    groups = groups.filter((g) => String(g.owner) !== String(req.user.userId));
    res.json(
      groups.sort((a, b) => {
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

router.get('/my', auth, async (req, res) => {
  try {
    const id = req.body.id || req.user.userId;
    const myGroups = await Group.find({owner: id});
    const groups = await Group.find({subscribers: id});
    res.json([
      ...myGroups.sort((a, b) => {
        const date1 = new Date(a.createDate);
        const date2 = new Date(b.createDate);

        return date2 - date1;
      }),
      ...groups,
    ]);
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.get(
  '/:id',
  [check('id', 'Отсутствует id записи').notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные сообщества',
        });
      }
      const {id} = req.params;

      const group = await Group.findById(id);

      res.json(group);
    } catch (error) {
      console.log(chalk.white.bgRed.bold(error));
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

router.get('/subscribers/:id', auth, async (req, res) => {
  try {
    const {top} = req.query;
    const group = await Group.findById(req.params.id);
    let subscribers;
    if (Object.keys(req.query).length > 0) {
      subscribers = await User.find()
        .where('_id')
        .in(group.subscribers)
        .limit(top ? top : '');
    } else {
      subscribers = await User.find().where('_id').in(group.subscribers);
    }
    subscribers =
      subscribers.length > 0
        ? subscribers.map((s) => ({
            id: s.id,
            firstName: s.profile.firstName,
            lastName: s.profile.lastName,
            img: null,
          }))
        : [];
    res.json(subscribers);
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.post('/follow/:id', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    const user = await User.findById(req.user.userId);
    if (!group.subscribers.includes(req.user.userId)) {
      group.subscribers.push(req.user.userId);
      await group.save();
    }
    if (!user.profile.groups.includes(group._id)) {
      user.profile.groups.push(group._id);
      await user.save();
    }
    res.json();
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.post('/unfollow/:id', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    const user = await User.findById(req.user.userId);
    if (group.subscribers.includes(req.user.userId)) {
      group.subscribers = group.subscribers.filter(
        (s) => String(s) !== String(req.user.userId)
      );
      await group.save();
    }
    if (user.profile.groups.includes(group._id)) {
      user.profile.groups = user.profile.groups.filter(
        (g) => String(g) !== String(group._id)
      );
      await user.save();
    }
    res.json();
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.delete(
  '/delete/:id',
  [check('id', 'Отсутствует id сообщества').notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные сообщества',
        });
      }
      const {id} = req.params;

      const group = await Group.findById(id);

      await group.delete();

      res.status(201).json({message: 'Сообщество удалена'});
    } catch (error) {
      console.log(chalk.white.bgRed.bold(error));
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

// router.delete('/deleteAll', auth, async (req, res) => {
//   try {
//     await Note.deleteMany(Note.find({owner: req.user.userId}));

//     res.status(201).json({message: 'Записи удалены'});
//   } catch (error) {
//     console.log(chalk.white.bgRed.bold(error));
//     res.status(500).json({message: `Server error: ${error}`});
//   }
// });

module.exports = router;
