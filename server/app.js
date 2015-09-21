var express = require('express'),
    app = module.exports = express(),
    bodyParser = require('body-parser'),
    compress = require('compression')(),
    path = require('path');

console.log(__dirname);

app.use(compress)
   .use(express.static(path.join(__dirname,'../client')))
   .use(bodyParser.json());

require('./router')(app);

// Start server
app.listen(80);
