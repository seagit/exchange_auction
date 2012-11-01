
module.exports.authenticate = function(user_id, pass, callback){
	console.log(user_id);
	console.log(pass);
	
	if(!req.session.token)
	{
		
	}
	else
	{
		//already logged in
	}
	
	if(user_id == '123' && pass == '234')
		callback({name: 'vasya'});
	else
		callback(null);
};

