const {Router} = require('express');
const router = Router();

router.use('/auth', require('./authRoute'));
router.use('/profile', require('./profileRoute'));
router.use('/notes', require('./notesRoute'));
router.use('/portfolio', require('./portfolioRoute'));
router.use('/users', require('./usersRoute'));
router.use('/groups', require('./groupsRoute'));
router.use('/news', require('./newsRouter'));
router.use('/gallery', require('./galleryRoute'));

module.exports = router;
