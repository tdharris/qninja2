var logme = require('logme'),
    async = require('async'),
    cleanup = require('./cleanup');

module.exports = function(task) {

    return function(err, results) {
        var eventHeader = "[taskHandler] [finishTask]";
        if(err) logme.error(eventHeader, "Problem processing request:", JSON.stringify(err));
        console.log(
            task.report.send
        );

        // send final report of task to engineer & close smtp-pool transport
        task.report.send(results, cleanup(task));
        
    };

};
