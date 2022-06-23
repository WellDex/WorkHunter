const {Router} = require('express');
const auth = require('../middleware/auhtMiddleware');
const Note = require('../modules/Note');
const User = require('../modules/User');
const chalk = require('chalk');

const router = Router();

router.get('/', auth, async (req, res) => {
  try {
    const id = req.user.userId;
    const user = await User.findById(id);
    const ids = [...user.profile.groups, ...user.profile.friends];
    const notes = await Note.find().where('owner').in(ids);
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

module.exports = router;
