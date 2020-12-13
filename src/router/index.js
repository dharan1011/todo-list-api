const express = require('express');
const {isAuthenticated} = require('../middleware/auth');
const router = express.Router();

router.use('/todo', isAuthenticated, require('./todo'));
router.use('/auth', require('./auth'));
router.use('/info', require('./info'));

module.exports = router;