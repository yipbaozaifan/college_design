var mongoose = require("mongoose");

var db = mongoose.createConnection('mongodb://localhost/demo');
//登录注册
var UserSchema = new mongoose.Schema({
	username:String,
	password:String,
	role:String
})
//用户信息数据库
var userMessageSchema = new mongoose.Schema({
	name:String,
	fans:Number,
	fo:Number,
	pics:Number,
	head_pic:String,
	intro:String
})
//图片分享数据库
var picListSchema = new mongoose.Schema({
	picsId:String,
	author:String,
	author_head:String,
	pics:Array,
	likeNum:Number
})
//图片评论数据库
var picCommentSchema = new mongoose.Schema({
	picsId:String,
	replyTo:String,
	author:String,
	content:String
})
db.on('error', function(error) {
  console.log(error);
});

exports.User =db.model('Users', UserSchema);
exports.
exports.db = db;