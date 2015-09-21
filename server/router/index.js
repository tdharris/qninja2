/**
 * Main application routes
 */

 module.exports = function(app) {

	var qmanagement = require('./routes/qmanagement')(app),
		qnotify = require('./routes/qnotify')(app);

    app.use('/qmanagement', qmanagement);
    app.use('/qnotify', qnotify);

	// All other routes should redirect to the index.html
	// app.route('/*')
	// 	.get(function(req, res) {
	// 	  res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
	// 	});
};