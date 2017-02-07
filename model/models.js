var mongoose = require("mongoose");

var db = mongoose.createConnection('mongodb://localhost/demo');
//登录注册
var UserSchema = new mongoose.Schema({
	username:String,
	password:String,
	nicName:String,
	url:String,
	role:String,
	done_survey:[mongoose.Schema.Types.ObjectId]
})

//问卷数据库
var survey = new mongoose.Schema({
	user:mongoose.Schema.Types.ObjectId,
	begin:mongoose.Schema.Types.ObjectId,
	end:mongoose.Schema.Types.ObjectId,
	background:String,
	survey_name:String,
	count:Number,
	questions:[mongoose.Schema.Types.ObjectId],
	tab:String
})
//问卷中每条问题的数据库（选项型问题）
var questions = new mongoose.Schema({
	survey:mongoose.Schema.Types.ObjectId,
	order:Number,
	describe:String,
	type:String,
	options:[mongoose.Schema.Types.ObjectId]
})
//问题数据库（问答型问题）
var text_questions = new mongoose.Schema({
	survey:mongoose.Schema.Types.ObjectId,
	order:Number,
	describe:String,
	type:String,
	answer:String
})
var options = new mongoose.Schema({
	question:mongoose.Schema.Types.ObjectId,
	order:Number,
	content:String
})
//各问题回答
var answers = new mongoose.Schema({
	survey:mongoose.Schema.Types.ObjectId,
	questions:mongoose.Schema.Types.ObjectId,
	choices:String
})

db.on('error', function(error) {
  console.log(error);
});

exports.db = db;