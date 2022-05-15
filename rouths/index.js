const {Router} = require('express');
const router = Router();

router.use('/auth', require('./authRoute'));
router.use('/profile', require('./profileRoute'));
router.use('/notes', require('./notesRoute'));

module.exports = router;
