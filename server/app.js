require('dotenv').config();

var express = require('express'),
    app = module.exports = express(),
    bodyParser = require('body-parser'),
    compress = require('compression')(),
    logme = require('logme'),
    fs = require('fs'),
    path = require('path'),
    http = require('http'),
    https = require('https');

var pub = path.join(__dirname,'/public');

// setup middleware
app.use(compress)
   .use(bodyParser.json())
   .use(express.static(pub));

// setup renderer
app.set('view engine', 'jade')
   .set('views', __dirname);

// include router
require('./lib/router')(app);

// Start server
if (process.env.NODE_ENV === 'httpOnly') {

    app.listen(80, function(){
      logme.info('[qninja] is listening at http://'+this.address().address+':'+this.address().port);
    });

} else {

    // Start server: redirect http to https
    http.createServer(function (req, res) {
        res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
        res.end();
    }).listen(80, function(){
      logme.info('[qninja] is listening at http://'+this.address().address+':'+this.address().port);
    });

    https.createServer({
        key: fs.readFileSync(process.env.SSL_PRIVATE_KEY),
        cert: fs.readFileSync(process.env.SSL_PUBLIC_PEM)
        //requestCert: false,
        //rejectUnauthorized: false
        //pfx: fs.readFileSync('./lib/ssl/lab.pfx'),
        //passphrase: 'novell'
    }, app).listen(443, function() {
    	logme.info('[qninja] is listening at https://'+this.address().address+':'+this.address().port);
    });

}
