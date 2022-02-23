const {Router} = require('express');
const router = Router();

router.use('/auth', require('./authRoute'));

module.exports = router;
