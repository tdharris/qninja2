/**
 * View routes
 */

 module.exports = function(app) {

	app.get('/dashboard', function(req, res){
		res.render('views/dashboard/index');
	});
	
	app.get('/qmanagement', function(req, res){
		res.render('views/qmanagement/index');
	});

	app.get('/qnotify', function(req, res){
		res.render('views/qnotify/index');
	});

	app.get('/*', function(req, res){
		res.redirect('/dashboard');
	});

};