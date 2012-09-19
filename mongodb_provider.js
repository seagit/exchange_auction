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
DbProvider.prototype.getItems = function(callback) {
    this.getCollection('items', function(error, items_collection) {
	  
	  console.log('items_collection ' + items_collection);
      
	  if( error ) callback(error)
      else {
        items_collection.find().toArray(function(error, results) {
		
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

DbProvider.prototype.getItemsByCategory = function(category, callback) {
    this.getCollection('items', function(error, items_collection) {
      if( error ) callback(error)
      else {
		items_collection.find({'category': category}, function(error, category_collection) {
			if( error ) callback(error)
			else {
				category_collection.toArray(function(error, results) {
					if( error ) callback(error)
					else callback(null, results)
				});
			}
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
DbProvider.prototype.getUsers = function(callback) {
    this.getCollection('users', function(error, users_collection) {
	  
	  console.log('users_collection ' + users_collection);
      
	  if( error ) callback(error)
      else {
        users_collection.find().toArray(function(error, results) {
		
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
      else {
		//...??? length of item ???
		users_collection.insert(user, function() {
          callback(null, user);
        });
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

module.exports = new DbProvider('localhost', 27017);
