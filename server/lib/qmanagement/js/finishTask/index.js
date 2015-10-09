var logme = require('logme'),
    async = require('async'),
    cleanup = require('./cleanup');

module.exports = function(err, cb) {
    var eventHeader = "[taskHandler] [finishTask]";
    if(err) logme.error(eventHeader, "Problem processing request:", JSON.stringify(err));

    async.series([
        task.report.send(), // send final report of task to engineer
        cleanup(task) // close smtp-pool transport
    ], function(err){
        logme.info(eventHeader, "Successfully processed request");

    });

};
