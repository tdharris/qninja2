var logme = require('logme'),
    async = require('async');

module.exports = function(err, cb) {
    var eventHeader = "[taskHandler] [cleanup]";
    if(err) logme.error(eventHeader, "Problem processing request:", JSON.stringify(err));
    // finally send task report, close transport
    async.series([
        function(cb){
            // Send final report of task to engineer
            task.report.send(function(err){
                cb(err);
            });
        },
        function(cb){
            // task cleanup
            task.transport.close(); // close the smtp-transport-pool
            logme.debug('[cleanup] [' + task.owner + '] Finished task cleanup');
        }
    ], function(err){
        logme.info(eventHeader, "Successfully processed request");

    });

};


