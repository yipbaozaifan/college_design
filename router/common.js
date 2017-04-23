var models = require('../model/models.js');
var mongoose = require('mongoose');

var User = models.User;
var Survey = models.Survey;
var Question = models.Question;
var Target = models.Target;
var Answer = models.Answer;

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
		Survey.findById(survey_id,function(err,survey){
			if(err){
				result = {
					'state':3,
					'message':'error',
					'data':[]
				}
				res.send(result);
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
				if(req.query.get_target){
					var ip = req.headers['x-forwarded-for'] ||
					req.ip ||req.connection.remoteAddress ||
					req.socket.remoteAddress ||
					req.connection.socket.remoteAddress || '';
				    if(ip.split(',').length>0){
				        ip = ip.split(',')[0]
				    }
				    var date = new Date();
				    var target = {
						ip:ip,
						survey:result.data[0]._id,
						start_time : date,
						end_time : date
					};
					console.log(target);
					var result;
					var new_target = new Target(target);
					result.data.push({target:new_target});
					res.send(result);
				}else{
					res.send(result);
				}
			}
		})
	},
	save_survey:function(req,res){
		var questions = req.body.questions;
		var survey = req.body.survey;
		var result ;
		//保存问卷信息
		console.log(survey._id);
		var save_promise = new Promise(function(resolve,reject){
			Survey.update({_id:survey._id},{$set:survey},function(err){
				if(err){
					reject(err);
				}else{
					resolve();
				}
			})
		})
		save_promise.then(function(){
			return new Promise(function(resolve,reject){
				Question.remove({survey:survey._id+''},function(err,data){
					if(err){
						reject(err);
					}else{
						resolve();
					}
				})
			})
		}).then(function(){
			return new Promise(function(resolve,reject){
				Question.collection.insert(questions,function(err,docs){
					if(err){
						reject(err);
					}else{
						resolve();
					}
				})
			})
		}).then(function(){
			return new Promise(function(resolve,reject){
				Question.find({survey:survey._id}).sort({index:1}).exec(function(err,questions){
					if(err){
						reject(err);
					}else{
						resolve(questions)
					}
				})
			})
		}).then(function(data){
			result = {
				state:1,
				message:"success",
				data:[{
					questions:data
				}]
			}
			res.send(result);
		}).catch(function(err){
			result = {
				state : 3,
				message : 'error',
				data : []
			}
			res.send(result);
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
	},
	submit:function(req,res){
		var answers = req.body.answers;
		var target = new Target(req.body.target);
		var result;
		var submit_promise = new Promise(function(resolve,reject){
			Target.find({survey:target.survey,ip:target.ip},function(err,data){
				if(err){
					reject(err);
				}else{
					resolve(data);
				}
			})
		})
		submit_promise.then(function(data){
			if(data.length!=0){
				return Promise.reject('is exist');
			}else{
				return new Promise(function(resolve,reject){
					target.save(function(err){
						if(err){
							reject(err);
						}else{
							resolve();
						}
					})
				})
			}
			
		}).then(function(){
			return new Promise(function(resolve,reject){
				Answer.collection.insert(answers,function(err,docs){
					if(err){
						reject(err);
					}else{
						resolve()
					}
				})
			})
		}).then(function(){
			result = {
				state:1,
				message:'success',
				data:[]
			}
			res.send(result);
		}).catch(function(err){
			if(err == 'is exist'){
				result = {
					state :2,
					message : err,
					data : []
				}
			}else{
				result = {
					state : 3,
					message : 'error',
					data : []
				}
			}
			res.send(result);
		})
	},
	analyze_catch:function(req,res){
		var survey_id = req.query.survey_id;
		var result = {},_survey,_questions,_targets,_answers;
		var analyze_prmise = new Promise(function(resolve,reject){
			Survey.findById(survey_id,function(err,survey){
				if(err){
					reject(err);
				}else{
					if(survey){
						_survey = survey;
						resolve();
					}else{
						reject('not found');
					}
				}
			})
		})
		analyze_prmise.then(function(){
			return new Promise(function(resolve,reject){
				Question.find({survey:survey_id},function(err,questions){
					if(err){
 						reject(err);
					}else{
						_questions = questions;
						resolve();
					}
				})
			})
		}).then(function(){
			return new Promise(function(resolve,reject){
				Target.find({survey:survey_id},function(err,targets){
					if(err){
						reject()
					}else{
						_targets = targets;
						resolve()
					}
				})
			})
		}).then(function(){
			return new Promise(function(resolve,reject){
				Answer.find({survey:survey_id},function(err,answers){
					if(err){
						reject(err)
					}else{
						_answers = answers;
						resolve()
					}
				})
			})
		}).then(function(){
			result = {
				state : 1,
				message : 'success',
				data:[
					{
						survey:_survey,
						questions:_questions,
						target:_targets,
						answers:_answers
					}
				]
			}
			res.send(result);
		}).catch(function(err){
			result={
				state : 3,
				message : 'error',
				data:[]
			}
			res.send(result);
		})
	}
}
module.exports = fnc;