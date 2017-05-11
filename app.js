var express = require('express');
var path = require('path');
var ejs=require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
//var models = require('./model/models.js');
var route = require('./router/index.js');

var port=process.env.PORT||3000;

var app = express();


app.set('views', path.join(__dirname, 'src'));//指明前端界面所存放的路径
app.engine('html', ejs.__express);//使ejs模板引擎使用html文件，使node能解析html文件并投影到浏览器
app.set('view engine', 'html');//设置render engine（模板引擎）

app.use('/static',express.static('static'));//处理静态文件的中间件,指明保存静态文件的路径

app.use(bodyParser.json());//解析请求体（body）中的json，并把请求体内容保存在req.body中
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());//解析cookie的中间件

/*app.use(session({
    resave:false,
    saveUninitialized: true,//添加这行
    secret:'yepeizhan',
    name:'loginDemo',
    cookie: { maxAge: 60*1000*60*24 }//配置cookie的保存时间1小时
}));*/

app.get("/", function(req, res) {
    res.render('index.html');//渲染index.html页面，浏览器访问web应用时发送get请求
});
app.use(route);


app.listen(port, function(){
	console.log('listening on port %d in %s mode', port, process.env.NODE_ENV);
});

module.exports = app;

