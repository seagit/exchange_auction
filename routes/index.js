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
		db.getUsers(function(error,users){
			if (error) res.send("Error. getUsers !!!");
			else res.send(users);//get info from req and rendering page
		});
	});
	app.get('/users/new', function(req, res){
		res.render('newuser', { title: 'Add new user' })
	});
	app.post('/users/save',function(req, res){
		console.log('user = ' + JSON.stringify(req.body.user));
		db.saveUser(req.body.user, function(error,user){
			if (error) res.send("Error. saveUser !!!");
			else res.redirect('/users/'+user._id);
		});
	});
	app.get('/users/:id', function(req, res){
		db.getUserById(req.params.id, function(error,user){
			if (error) res.send("Error. Unknown user !!!");
			/*else res.send(user);*/
			else res.render('showuser', { user: user});
		});
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
	app.post('/items/save', function(req, res){
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
