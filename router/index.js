var express = require('express');
var common = require('./common.js')
var router = express.Router();//创建express的路由对象


//创建路由级中间件，并定义接口路径
router.use('/login',common.login);
router.use('/signIn',common.signIn);
router.use('/search_user',common.search_user);
router.use('/create',common.create_survey);
router.use('/get_survey',common.get_survey);
router.use('/save_survey',common.save_survey);
router.use('/get_questions',common.get_questions);
router.use('/my_surveys',common.my_surveys);
router.use('/submit',common.submit);
router.use('/analyze_catch',common.analyze_catch);

module.exports = router;