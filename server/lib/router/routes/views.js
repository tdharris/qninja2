/**
 * View routes
 */

var path = require('path');

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

	// All other routes should redirect to the index.html
	app.route('/dashboard/*')
		.get(function(req, res) {
		  res.render(path.resolve('views' + req.url));
		});

	// app.get('/*', function(req, res){
	// 	res.redirect('/dashboard');
	// });

};