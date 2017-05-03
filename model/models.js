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
	options:[{value:String,checked:Boolean}]
})
/*各问题回答
*单选题、问答题value只有一个值，多选题多个值
*target字段表示受访者
*/
var answers = new mongoose.Schema({
	target:String,
	survey:String,
	question:String,
	values:[]
})
//填写问卷的目标
var target = new mongoose.Schema({
	ip:String,
	survey:String,
	start_time:Date,
	end_time:Date
})

db.on('error', function(error) {
  console.log(error);
});

var userModel = db.model('user',UserSchema,'user');
var surveyModel = db.model('survey',survey,'survey');
var questionModel = db.model('question',questions,'question');
var answersModel = db.model('answer',answers,'answer');
var targetModel = db.model('target',target,'target');

exports.User = userModel;
exports.Survey = surveyModel;
exports.Question = questionModel;
exports.Answer = answersModel;
exports.Target = targetModel; 