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
		//return res.send(req.query.parameters || {});
		db.getUsers(req.query.parameters || {}, function(error,users){
			if (error) res.send("Error. getUsers !!!");
			else res.send(users);//get info from req and rendering page
		});
	});
	app.get('/user', function(req, res){
		res.render('newuser', { title: 'Add new user' })
	});
	app.post('/user',function(req, res){
		console.log('user = ' + JSON.stringify(req.body.user));
		db.saveUser(req.body.user, function(error,user){
			if (error) res.send("Error. saveUser !!!");
			else res.redirect('/user/'+user._id);
		});
	});
	app.get('/user/:id', function(req, res){
		db.getUserById(req.params.id, function(error,user){
			if (error) res.send("Error. Unknown user !!!");
			else res.render('showuser', { user: user});
		});
	});
	
	//delete user by id
	//...
	//update user by id
	//...
	
	//items
	app.get('/items', function(req, res){
		//return res.send(req.query.parameters || {});
		db.getItems(req.query.parameters || {}, function(error,items){
			if (error) res.send("Error. getItems !!!");
			else res.send(items);
		});
	});
	app.get('/item', function(req, res){
		//get info from req and rendering page
		res.send('Add New item...');
	});
	app.post('/item', function(req, res){
		//get info from req and rendering page
		res.send('New item has added');
	});
	app.get('/item/:id', function(req, res){
		db.getItemById(req.params.id, function(error,item){
			if (error) res.send("Error. Unknown item !!!");
			else res.send(item);//res.render('showlot', { lot: item});
		});
	});
	//delete item by id
	//...
	//update item by id
	//...
	//categories
	app.get('/categories', function(req, res){
		//return res.send(req.query.parameters || {});
		db.getCategories(req.query.parameters || {}, function(error,categories){
			if (error) res.send("Error. getCategories !!!");
			else res.send(categories);//get info from req and rendering page
		});
	});
	app.get('/category', function(req, res){
		res.render('newcategory', { title: 'Add new category' })
	});
	app.post('/category',function(req, res){
		console.log('category = ' + JSON.stringify(req.body.category));
		db.saveCategory(req.body.category, function(error,category){
			if (error) res.send("Error. saveCategory !!!");
			else res.redirect('/category/'+category._id);
		});
	});
	app.get('/category/:id', function(req, res){
		db.getCategoryById(req.params.id, function(error,category){
			if (error) res.send("Error. Unknown category !!!");
			else res.send(category);
		});
	});
	
	//delete category by id
	//...
	//update category by id
	//...
}
