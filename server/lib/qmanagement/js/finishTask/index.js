var logme = require('logme'),
    async = require('async'),
    cleanup = require('./cleanup');

module.exports = function(task) {

    return function(err, results) {
        var eventHeader = "[taskHandler] [finishTask]";
        if(err) logme.error(eventHeader, "Problem processing request:", JSON.stringify(err));
        console.log('-----', 
            err, 
            task.report.send
        );
        async.series([
            task.report.send(results), // send final report of task to engineer
            cleanup(task) // close smtp-pool transport
        ], function(err){
            logme.info(eventHeader, "Successfully processed request");

        });  
    };

};
