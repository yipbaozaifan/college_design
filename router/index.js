var express = require('express');
var common = require('./common.js')
var router = express.Router();

router.use('/login',common.login);
router.use('/signIn',common.signIn);

module.exports = router;