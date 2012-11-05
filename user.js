var crypto = require('crypto');
var mdb = require('./mongodb_provider');

module.exports.authenticate = function(user_name, pass, callback){
	console.log(user_name);
	console.log(pass);
	
	function generateObminToken() {
		return Math.round((new Date().valueOf() * Math.random())) + '4';
	}

	function obminHash(pass, salt) {
		return crypto.createHash('sha256', salt).update(pass).digest("hex");
	}

	/*function makeSalt() 
	{
      return Math.round((new Date().valueOf() * Math.random())) + '';
    }
	
	function makeTokens() 
	{
      return [Math.round((new Date().valueOf() * Math.random())) + '4', Math.round((new Date().valueOf() * Math.random())) + '4'];
    }*/ /* - to register function !!!  */

	
	mdb.getUserPass(user_name, function(psw, salt, user_id){
		if(psw && pass && obminHash(pass, salt) == psw)
		{				
			var newSessionToken = generateObminToken();
			callback(newSessionToken, user_id);
		}
		else callback(null);

	});
	
};

