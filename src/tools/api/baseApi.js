import $ from 'jquery';

exports.ajaxGet = function(data,url){
	var result;
	$.ajax({
		url:url,
		data:data,
		type:'get',
		dataType:'json',
		async : false,
		success:function(data){
			result = data;
		}
	})
	return result;
}

exports.ajaxPost = function(data,url){
 	var result = null;
	$.ajax({
		url:url,
		data:data,
		type:'post',
		async : false,
		success:function(data){
			result = data ;
			console.log(result);
		}
	})
	return result;
}

exports.picPost = function(data,url){
 	var result = null;
	$.ajax({
		url:url,
		data:data,
		type:'post',
		async : false,
		processData: false,  
        contentType: false,
		success:function(data){
			result = data ;
			console.log(result);
		}
	})
	return result;
}