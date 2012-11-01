var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

DbProvider = function(host, port) {
  this.db= new Db('exchange_auction_db', new Server(host, port, {auto_reconnect: true}, {}));
  this.db.open(function(){
	console.log('Database "exchange_auction_db" has opened');
  });
};

DbProvider.prototype.getCollection = function(collectionName,callback) {
  this.db.collection(collectionName, function(error, collection) {
    if( error ) callback(error);
    else callback(null, collection);
  });
};

//Items(collection of Goods or Product)
DbProvider.prototype.getItems = function(parameters, callback) {
    this.getCollection('items', function(error, items_collection) {
	  
	  console.log('items_collection ' + items_collection);
      
	  if( error ) callback(error)
      else {
        items_collection.find(parameters).toArray(function(error, results) {
		
			console.log('items ' + results);
			
			if( error ) callback(error)
			else callback(null, results)
        });
      }
    });
};

DbProvider.prototype.getItemById = function(id, callback) {
    this.getCollection('items', function(error, items_collection) {
      if( error ) callback(error)
      else {
        items_collection.findOne({_id: items_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });
};

DbProvider.prototype.saveItem = function(item, callback) {
    this.getCollection('items', function(error, items_collection) {
      if( error ) callback(error)
      else {
		//...??? length of item ???
		items_collection.insert(item, function() {
          callback(null, item);
        });
      }
    });
};

DbProvider.prototype.addOfferToItem = function(itemId, offer, callback) {
	this.getCollection('items', function(error, items_collection) {
    if( error ) callback( error );
    else {
      items_collection.update(
        {_id: items_collection.db.bson_serializer.ObjectID.createFromHexString(itemId)},
        {"$push": {'offers': offer}},
        function(error, item){
          if( error ) callback(error);
          else callback(null, item)
        });
    }
  });
};

//User
DbProvider.prototype.getUsers = function(parameters,callback) {
    this.getCollection('users', function(error, users_collection) {
	  
	  console.log('users_collection ' + users_collection);
      
	  if( error ) callback(error)
      else {
        users_collection.find(parameters).toArray(function(error, results) {
		
			console.log('users ' + results);
			
			if( error ) callback(error)
			else callback(null, results)
        });
      }
    });
};

DbProvider.prototype.getUserById = function(id, callback) {
    this.getCollection('users', function(error, users_collection) {
      if( error ) callback(error)
      else {
        users_collection.findOne({_id: users_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });
};

DbProvider.prototype.saveUser = function(user, callback) {
    this.getCollection('users', function(error, users_collection) {
        if( error ) callback(error)
        else 
        {
		          //...??? length of item ???
              console.log(user);
		          users_collection.save(user);
              callback(null, user);
        }
    });
};

DbProvider.prototype.addItemToUser = function(userId, item, callback) {
	this.getCollection('users', function(error, users_collection) {
    if( error ) callback( error );
    else {
	/*
      users_collection.update(
        {_id: users_collection.db.bson_serializer.ObjectID.createFromHexString(userId)},
        {"$push": {'items': item}},
        function(error, item){
          if( error ) callback(error);
          else callback(null, item)
        });
		*/
    }
  });
};

//Category
DbProvider.prototype.getCategories = function(parameters,callback) {
    this.getCollection('categories', function(error, category_collection) {
	  
	  console.log('category_collection ' + category_collection);
      
	  if( error ) callback(error)
      else {
        category_collection.find(parameters).toArray(function(error, results) {
		
			console.log('categories ' + results);
			
			if( error ) callback(error)
			else callback(null, results)
        });
      }
    });
};

DbProvider.prototype.getCategoryById = function(id, callback) {
    this.getCollection('categories', function(error, category_collection) {
      if( error ) callback(error)
      else {
        category_collection.findOne({_id: category_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });
};

DbProvider.prototype.saveCategory = function(category, callback) {
    this.getCollection('categories', function(error, category_collection) {
      if( error ) callback(error)
      else {
		//...??? length of item ???
		category_collection.insert(category, function() {
          callback(null, category);
        });
      }
    });
};

DbProvider.prototype.createSession = function(token, user_id, callback) {
	if(token && user_id)
	{
		var newSession = {token: token, user_id: user_id};
		this.getCollection('tokens', function(error, tokens_coll){
      if(!error)
      {  
        console.log('xxxxxxxxxxx');
        console.log(newSession);
        tokens_coll.save(newSession);
        callback(token);
      }
      else callback(null);

    });		
	}
	else callback(null);
};

DbProvider.prototype.getSession = function(token, callback) {
	if(token)
	{
		var sess = this.tokens.find({token: token});
		if(userId) callback(sess.userId);
		else callback(null);
	}
	else callback(null);
};

DbProvider.prototype.destroySession = function(token, callback) {
	if(token)
	{
		this.tokens.remove({token: token});
		callback({});
	}
	else callback(null);
};

DbProvider.prototype.getUserPass = function(user_name, callback) {
  if(user_name)
  {
    this.getCollection('users', function(error, users_coll){
      if(!error)
      {
        users_coll.findOne({name: user_name}, function(err, usr){
            if(usr) callback(usr.psw, usr.salt);
            else callback(err);
        });
      }
      else callback(null);
    });
  }
  else callback(null);
};

module.exports = new DbProvider('localhost', 27017);
