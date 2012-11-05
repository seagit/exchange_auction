module.exports = function(params) 
{
	var app    = params.app,
	    db	   = params.db,
	    user   = params.user,
	    crypto = params.crypto;
	
	function requiresLogin(req, res, next)
	{
		console.log('middleware');
		if(req.session.token)
		{
			console.log('token : ' + req.session.token);
			db.getSession(req.session.token, function(userId){
				if(userId) next();
				else res.redirect('/sessions/new?redirect=' + req.url);
			});
		}
		else res.render('bad_auth');
	}

	function makeTokens() 
	{
      return [Math.round((new Date().valueOf() * Math.random())) + '4', Math.round((new Date().valueOf() * Math.random())) + '4'];
    }

	//index
	app.get('/', function(req, res){
		db.getCategories({}, function(error, categories){
			res.render('index', { title: 'Exchange auction', categories: categories });
		})
	});
	
	//login
	app.post('/login', function(req, res){

		
			if(req.body.user_name && req.body.pass)
			{
				user.authenticate(req.body.user_name, req.body.pass, function(sessToken, user_id){
					if(sessToken)
					{
						req.session.token = sessToken;
						db.createSession(sessToken, user_id, function(token){
								console.log('success login');
								res.redirect('/');						
						});
						/*if (req.body.remember_me)
						{
        					var  loginToken1, loginToken2;
        					[loginToken1, loginToken2] = makeTokens();
        					
        					loginToken.save(function() {
          						res.cookie('logintoken', loginToken.cookieValue, {
              					expires: new Date(Date.now() + 2 * 604800000),
              					path: '/'
          					});
        		});
      }			*/			
					}						
					else	res.redirect('/login?redirect=' + req.url);
				})
			}
		
	});

	app.get('/login', function(req, res){
		var salt = Math.round((new Date().valueOf() * Math.random())) + '4';
		var psw = crypto.createHash('sha256', salt).update('123').digest("hex");
		db.saveUser({name:'testuser', salt: salt, psw: psw}, function(){});
		res.redirect('/');
	});

	//logout
	app.get('/logout', requiresLogin, function(req, res){
			console.log('logout');
			req.session.destroy(function() {});
			res.redirect('/');
	});

	//about
	app.get('/about', requiresLogin, function(req, res){
		res.render('about');
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
		if (req.query.parameters )
			db.getItems(req.query.parameters || {}, function(error,items){
				if (error) res.send("Error. getItems !!!");
				else res.send(items);
			});
		else
			res.render('newitem');
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
			else res.render('showlot', { lot: item});
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
			else
			{
				db.getItems({category: category._id }, function(error,items){
					db.getCategories({}, function(error, categories){
						if (error) res.send("Error. getItems !!!");
						else res.render('category', {items: items, sub_cat: categories, cur_cat: category });
						//else res.send(items);
					});
				});
			}
		});
	});
	
	//delete category by id
	//...
	//update category by id
	//...
}
