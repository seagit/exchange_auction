module.exports = function(params) 
{
	var app = params.app,
		db	= params.db;
	
	//index
	app.get('/', function(req, res){
		res.render('index', { title: 'Exchange auction' });
	});
	//about
	app.get('/about', function(req, res){
		res.render('index', { title: 'About exchange auction' });
	});
	//users
	app.get('/users', function(req, res){
		//get info from req and rendering page
		db.getUsers(function(error,items){
			if (error) res.send("Error. getUsers !!!");
			else res.send(items);
		});
	});
	app.get('/users/new', function(req, res){
		//get info from req and rendering page
		res.send('Add new user...');
	});
	app.post('/users/new',function(req, res){
		//get info from req and rendering page
		res.send('New user has added');
	});
	app.get('/users/:id', function(req, res){
		//get info from req and rendering page
		res.send('get user by id...');
	});
	
	//delete user by id
	//...
	//update user by id
	//...
	
	//items
	app.get('/items', function(req, res){
		//get info from req and rendering page
		db.getItems(function(error,items){
			if (error) res.send("Error. getItems !!!");
			else res.send(items);
		});
	});
	app.get('/items/new', function(req, res){
		//get info from req and rendering page
		res.send('Add New item...');
	});
	app.post('/items/new', function(req, res){
		//get info from req and rendering page
		res.send('New item has added');
	});
	app.get('/items/:id', function(req, res){
		//get info from req and rendering page
		res.send('get item by id...');
	});
	//delete item by id
	//...
	//update item by id
	//...
}