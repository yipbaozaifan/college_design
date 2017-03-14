var models = require('../model/models.js');
var mongoose = require('mongoose');

var User = models.User;
var Survey = models.Survey;
var Question = models.Question;

var fnc = {
	login:function(req,res){
		var username = req.query.username;
		var password = req.query.password;
		var result ;
		console.log(username);
		User.find({username:username},function(err,person){
			if(err){
				result = {
				'state' : 3,
				'message' :'error!',
				'data':[]
				}
			}else{
				if(person.length==0||person[0].password!=password){
					result = {
					'state' : 2,
					'message' :'username or password is wrong!',
					'data':[]
					}
				}else{
					result = {
						'state' : 1,
						'message' :'login success!',
						'data':[
							{
								_id:person[0]._id,
								username:person[0].username,
								nicName:person[0].nicName,
							}
						]
					}
					res.cookie('user',person[0].username);
				}
			}
			res.send(result);
		})
	},
	signIn:function(req,res){
		console.log(req.body.username);
		var username = req.body.username;
		var password = req.body.password;
		var nicName = req.body.nicName;
		var users,result;
		var TestEntity = new User({
			username:username,
			password:password,
			nicName:nicName
		})
		User.find({username:username},function(err,person){
			if(err){
				result = {
					'state' : 3,
					'message' :'error',
					'data':[]
				}	
				res.send(result);
			}else{
				if(person.length==0){
					TestEntity.save(function(err){
						//console.log(err);
						if(err){
							result = {
							'state' : 3,
							'message' :'error',
							'data':[]
							}	
						}else{
							result = {
								'state' : 0,
								'message' :'signIn success!',
								'data':[]
								}	
						}
						res.send(result);	
					});
				}else{
					result = {
						'state' : 2,
						'message' :'this username is exist!',
						'data':[]
					}
					res.send(result);
				}
			}
		})
	},
	search_user:function(req,res){
		var _id = req.query.user_id;
		User.find({_id:_id},function(err,person){
			if(err){
				result = {
				'state' : 3,
				'message' :'error!',
				'data':[]
				}
			}else{
				if(person.length==0){
					result = {
					'state' : 2,
					'message' :'not found',
					'data':[]
					}
				}else{
					result = {
						'state' : 1,
						'message' :'login success!',
						'data':[
							{
								user_id:person[0]._id,
								username:person[0].username,
								nicName:person[0].nicName,
							}
						]
					}
				}
			}
			res.send(result);
		})
	},
	create_survey:function(req,res){
		var new_survey = new Survey(req.body);
		var result;
		new_survey.save(function(err){
			if(err){
				result = {
					'state':3,
					'message':'出错了',
					'data':[]
				}
			}else{
				var id = 
				result = {
					'state' : 0,
					'message' :'create success!',
					'data':[
						{
							id:new_survey._id
						}
					]
				}							
			}
			res.send(result);
		})
	},
	get_survey:function(req,res){
		var survey_id = req.query.survey_id;
		var result;
		console.log(survey_id);
		Survey.findById(survey_id,function(err,survey){
			if(err){
				result = {
					'state':3,
					'message':'error',
					'data':[]
				}
			}else{
				result = {
					'state':1,
					'message':'get success',
					'data':[
						{
							_id:survey._id,
							survey_name:survey.survey_name,
							intro:survey.intro,
							end:survey.end,
							question:survey.question,
							status:survey.status
						}					
					]
				}
			}
			res.send(result);
		})
	},
	add_question:function(question){
		var new_question = new Question(question);
		new_question.save(function(err){
			if(err){
				return false;
			}else{
				return true;			
			}
		})
	},
	save_survey:function(req,res){
		var questions = req.body.questions;
		var survey = req.body.survey;
		var result ;
		//保存问卷信息
		console.log(survey._id);
		Survey.update({_id:survey._id},{$set:survey},function(err){
			if (err) {
				result = {
					'state':3,
					'message':'error',
					'data':[]
				}
				res.send(result);
			}else{
				Question.remove({survey:survey._id+''},function(err,writeOpResult){
					if(err){
						result = {
							'state':3,
							'message':'error',
							'data':[]
						}
						res.send(result)
					}else{
						Question.collection.insert(questions,function(err,docs){
							if(err){
								result = {
									'state':3,
									'message':'error',
									'data':[]
								}
							}else{
								result = {
									'state':1,
									'message':'success',
									'data':[]
								}
							}
							res.send(result);
						})
					}
				})
			}
		})
	},
	get_questions:function(req,res){
		var _id = req.query.belong_survey;
		var test = '备注'
		var result;
		Question.find({'survey':_id}).sort({index:1}).exec(function(err,questions){
			if(err){
				result = {
					'state':3,
					'message':'error',
					'data':[]
				}
			}else{
				console.log(questions);
				result = {
					'state':1,
					'message':'success',
					'data':[
						{
							questions:questions
						}
					]
				}
			}
			res.send(result);
		})
	},
	my_surveys:function(req,res){
		var user = req.query.user_id;
		var result;
		Survey.find({user:user},function(err,docs){
			if(err){

			}else{
				console.log(docs);
				result = {
					'state':1,
					'message':'success',
					'data':[
						{
							surveys : docs
						}
					]
				}
			}
			res.send(result);
		})
	}
}
module.exports = fnc;