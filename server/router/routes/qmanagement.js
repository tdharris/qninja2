/**
 * Route handler: qmanagement
 */

var express = require('express');

module.exports = function(app) {
	var router = express.Router();
		module = require('../../lib/qmanagement');

	router.post('/getServiceRequests', function(req, res){
	  module.getServiceRequests(req, res);
	});

	router.post('/sendMail', function(req, res){
		module.requestHandler(req, res);	
	});

	return router;
};