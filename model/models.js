var mongoose = require("mongoose");

var db = mongoose.createConnection('mongodb://localhost/survey');
//登录注册
var UserSchema = new mongoose.Schema({
	username:String,
	password:String,
	nicName:String
})

//问卷数据库
var survey = new mongoose.Schema({
	user:{type:mongoose.Schema.Types.ObjectId},
	survey_name:String,
	count:Number,
	intro:String,
	end:String,
	status:Number,
	question:Number
})
//问卷中每条问题的数据库（选项型问题）
var questions = new mongoose.Schema({
	survey:String,
	title:String,
	desc:String,
	type:String,
	index:Number,
	options:[]
})
//各问题回答
var answers = new mongoose.Schema({
	survey:mongoose.Schema.Types.ObjectId,
	questions:String,
	choices:String
})

db.on('error', function(error) {
  console.log(error);
});

var userModel = db.model('user',UserSchema,'user');
var surveyModel = db.model('survey',survey,'survey');
var questionModel = db.model('question',questions,'question');

exports.User = userModel;
exports.Survey = surveyModel;
exports.Question = questionModel;