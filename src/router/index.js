const express = require('express');

const router = express.Router();

router.use('/todo', require('./todo'));
router.use('/auth', require('./auth'));
router.use('/info', require('./info'));

module.exports = router;