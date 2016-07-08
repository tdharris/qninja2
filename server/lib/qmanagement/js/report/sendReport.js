var logme = require('logme');

module.exports = function(task) {

    return function(cb){
	    // Send final report of task to engineer
	    logme.info(task.eventHeader + '[report] ' + 'Sending report to engineer');
	    task.report.send(function(err){
	        cb(err);
	    });
	};

};


