var express = require('express'),
    app = module.exports = express(),
    bodyParser = require('body-parser'),
    compress = require('compression')(),
    path = require('path');

var pub = path.join(__dirname,'/public');

// setup middleware
app.use(compress)
   .use(bodyParser.json())
   .use(express.static(pub));

// setup renderer
app.set('view engine', 'jade')
   .set('views', __dirname); // default dir is 'views'

// include router
require('./lib/router')(app);

// Start server
app.listen(80);
	