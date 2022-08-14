const {Router} = require('express');
const auth = require('../middleware/auhtMiddleware');
const Category = require('../modules/Category');
const chalk = require('chalk');

const router = Router();

router.post('/create', auth, async (req, res) => {
  try {
    const {title, parent} = req.body;
    const category = await Category({
      title,
      parent,
      createDate: new Date(),
    });
    newCategory = await category.save();
    if (parent) {
      const categoryParent = await Category.findById(parent);
      categoryParent.childrens.push(category._id);
      await categoryParent.save();
    }
    res.json({message: `Категория создана`});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.put('/update', auth, async (req, res) => {
  try {
    const category = await Category.findById(req.body._id);
    category.title = req.body.title;
    await category.save();
    res.json({message: `Категория обновлена`});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category.parent) {
      const categoryParent = await Category.findById(category.parent);
      categoryParent.childrens = categoryParent.childrens.filter(
        (id) => id !== category._id
      );
      await categoryParent.save();
    }
    await category.delete();
    res.json({message: `Категория удалена`});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const categories = await Category.find();
    const parents = categories.filter((category) => category.parent === null);
    categories.forEach((category) => {
      if (category.parent) {
        parents
          .find((item) => String(item._id) === category.parent)
          .children.push(category);
      }
    });
    res.json(parents);
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

module.exports = router;
