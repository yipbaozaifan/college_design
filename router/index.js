var express = require('express');
var common = require('./common.js')
var router = express.Router();

router.use('/login',common.login);
router.use('/signIn',common.signIn);
router.use('/search_user',common.search_user);
router.use('/create',common.create_survey);
router.use('/get_survey',common.get_survey);
router.use('/save_survey',common.save_survey);
router.use('/get_questions',common.get_questions);
router.use('/my_surveys',common.my_surveys);
router.use('/submit',common.submit);

module.exports = router;