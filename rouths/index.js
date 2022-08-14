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
router.use('/messenger', require('./messengerRoute'));
router.use('/project', require('./projectRoute'));
router.use('/categories', require('./categoriesRoute'));
router.use('/admin', require('./adminRoute'));

module.exports = router;
