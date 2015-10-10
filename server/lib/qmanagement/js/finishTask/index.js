var logme = require('logme'),
    async = require('async'),
    cleanup = require('./cleanup');

module.exports = function(err, mail, task) {
    var eventHeader = "[taskHandler] [finishTask]";
    if(err) logme.error(eventHeader, "Problem processing request:", JSON.stringify(err));
    console.log('-----', 
        err, 
        JSON.stringify(mail), // this is undefined
        JSON.stringify(task) // this is undefined
    );
    async.series([
        task.report.send(), // send final report of task to engineer
        cleanup(task) // close smtp-pool transport
    ], function(err){
        logme.info(eventHeader, "Successfully processed request");

    });

};
