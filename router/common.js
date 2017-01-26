var models = require('../model/models.js');

var User = models.User;

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
						'state' : 0,
						'message' :'login success!',
						'data':[
							{
								username:person[0].username,
								password:person[0].password
							}
						]
					}
				}
			}
			
			res.send(result);
		})
	},
	signIn:function(req,res){
		var username = req.body.username;
		var password = req.body.password;
		var users,result;
		var TestEntity = new User({
			username:username,
			password:password
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
	}
}
module.exports = fnc;