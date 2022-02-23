const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auhtMiddleware');
const Profile = require('../modules/Profile');
const chalk = require('chalk');

const router = Router();

router.get('/', auth, async (req, res) => {
  try {
    const id = req.body.id || req.user.userId;
    const profile = await Profile.find({owner: id});

    res.json(...profile);
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

module.exports = router;
