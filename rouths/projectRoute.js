const {Router} = require('express');
const auth = require('../middleware/auhtMiddleware');
const User = require('../modules/User');
const Category = require('../modules/Category');
const Project = require('../modules/Project');
const chalk = require('chalk');

const router = Router();

router.get('/all', auth, async (req, res) => {
  try {
    const {rootValue, subValue} = req.query;
    let projects = [];
    if (subValue) {
      projects = await Project.find({performer: null, category: subValue});
    } else if (rootValue) {
      const category = await Category.findById(rootValue);
      projects = await Project.find({performer: null})
        .where('category')
        .in(category.childrens);
    } else {
      projects = await Project.find({performer: null});
    }
    res.json(projects);
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});
router.get('/accept', auth, async (req, res) => {
  try {
    const {rootValue, subValue} = req.query;
    let projects = [];
    if (subValue) {
      projects = await Project.find({category: subValue})
        .where('performer.id')
        .in(req.user.userId);
    } else if (rootValue) {
      const category = await Category.findById(rootValue);
      projects = await Project.find()
        .where('performer.id')
        .in(req.user.userId)
        .where('category')
        .in(category.childrens);
    } else {
      projects = await Project.find().where('performer.id').in(req.user.userId);
    }
    res.json(projects);
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});
router.get('/my', auth, async (req, res) => {
  try {
    const {rootValue, subValue} = req.query;
    let projects = [];
    if (subValue) {
      projects = await Project.find({
        owner: req.user.userId,
        category: subValue,
      });
    } else if (rootValue) {
      const category = await Category.findById(rootValue);
      projects = await Project.find({owner: req.user.userId})
        .where('category')
        .in(category.childrens);
    } else {
      projects = await Project.find({owner: req.user.userId});
    }
    res.json(projects);
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});
router.post('/create', auth, async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      createDate: new Date(),
      owner: req.user.userId,
    });

    await project.save();

    res.status(201).json({message: 'Проект создан'});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});
router.post('/addRate', auth, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const project = await Project.findById(req.body.projectId);
    let rating = 0;
    if (user.profile.rating.count > 0 && user.profile.rating.number > 0) {
      rating = user.profile.rating.number / user.profile.rating.count;
    }
    project.rate.push({
      id: user._id,
      avatar: user.profile.avatar,
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      rating,
      message: req.body.message,
      date: new Date(),
    });
    await project.save();

    res.status(201).json({message: 'Заявка подана'});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});
router.post('/addPerformer', auth, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const project = await Project.findById(req.body.projectId);
    project.performer = {
      id: user._id,
      avatar: user.profile.avatar,
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
    };
    await project.save();

    res.status(201).json({message: 'Кандидат принят'});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});
router.put('/checking', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.body.projectId);
    project.isCheck = req.body.isCheck;
    await project.save();

    res.status(201).json({message: 'Статус изменен'});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});
router.put('/:id', auth, async (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    await project.delete();
    res.status(201).json({message: 'Проект удален'});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

module.exports = router;
