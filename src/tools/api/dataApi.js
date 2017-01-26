import BaseApi from './baseApi';

var APILIST = {
	SIGNIN:"http://localhost:8080/share/register",
	LOGIN:"http://localhost:8080/share/loginJudge",
	GETUSERMESSAGE:'http://localhost:8080/register',
	GETPICLIST:'http://localhost:8080/share/viewShare',
	GETMYPICLIST:'http://localhost:8080/share/user/viewMyShare',
	GETFANS:'http://localhost:8080/share/user/fans',
	FOLLOW:'http://localhost:8080/share/user/concern',
	UNFOLLOW:'http://localhost:8080/share/user/cancelConcern',
	LIKE:'http://localhost:8080/share/user/zan',
	COMMENT:'http://localhost:8080/share/user/comment',
	COLLECT:'http://localhost:8080/share/user/shareCollection',
	GETFO:'http://localhost:8080/share/user/concerns',
	GETLIKE:'http://localhost:8080/share/user/getZan',
	GETCOMMENT:'http://localhost:8080/share/user/getcomment',
	POSTSHARE:'http://localhost:8080/share/user/Share',
	GETMYCOLLECT:'http://localhost:8080/share/user/myCollections',
	ADMINGETUSERS:'http://localhost:8080/share/manager/listUser',
	ADMINOFF:'http://localhost:8080/share/manager/off',
	RANK:'http://localhost:8080/share/user/zanCollection',
	SEARCH:'http://localhost:8080/share/search',
	UPDATE:'http://localhost:8080/share/user/userUpdate'
}

var fnc = {
	NewUserSignUp:function(data){
		var result = BaseApi.ajaxPost(data,APILIST.SIGNIN);
		return result;
	},
	UserLogin:function(data){
		var result = BaseApi.ajaxPost(data,APILIST.LOGIN);
		return result;
	},
	GetUserMessage:function(data){
		var result = BaseApi.ajaxGet(data,APILIST.GETUSERMESSAGE);
		return result;
	},
	GetPicList:function(data){
		var result = BaseApi.ajaxGet(data,APILIST.GETPICLIST);
		return result;
	},
	GetMyPicList:function(data){
		var result = BaseApi.ajaxGet(data,APILIST.GETMYPICLIST);
		return result;
	},
	GetFans:function(data){
		var result = BaseApi.ajaxGet(data,APILIST.GETFANS);
		return result;
	},
	GetFos:function(data){
		var result = BaseApi.ajaxGet(data,APILIST.GETFO);
		return result;
	},
	GetLike:function(data){
		var result = BaseApi.ajaxGet(data,APILIST.GETLIKE);
		return result;
	},
	GetComment:function(data){
		var result = BaseApi.ajaxGet(data,APILIST.GETCOMMENT);
		return result;
	},
	Follow:function(data){
		BaseApi.ajaxGet(data,APILIST.FOLLOW);
	},
	UnFollow:function(data){
		BaseApi.ajaxGet(data,APILIST.UNFOLLOW);
	},
	PostPic:function(data){
		BaseApi.picPost(data,APILIST.POSTSHARE);
	},
	Comment:function(data){
		BaseApi.ajaxGet(data,APILIST.COMMENT);
	},
	Like:function(data){
		BaseApi.ajaxGet(data,APILIST.LIKE);
	},
	Collect:function(data){
		BaseApi.ajaxGet(data,APILIST.COLLECT);
	},
	GetMyCollect:function(data){
		var result = BaseApi.ajaxGet(data,APILIST.GETMYCOLLECT);
		return result;
	},
	AdminGetUsers:function(data){
		var result = BaseApi.ajaxGet(data,APILIST.ADMINGETUSERS);
		return result;
	},
	AdminOff:function(data){
		var result = BaseApi.ajaxGet(data,APILIST.ADMINOFF);
		return result;
	},
	GetRank:function(data){
		var result = BaseApi.ajaxGet(data,APILIST.RANK);
		return result;
	},
	Search(data){
		var result = BaseApi.ajaxGet(data,APILIST.SEARCH);
		return result;
	},
	Update(data){
		var result = BaseApi.picPost(data,APILIST.UPDATE);
		return result;
	}
}

exports.fnc = fnc;