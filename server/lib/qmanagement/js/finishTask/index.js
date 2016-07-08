var logme = require('logme'),
    async = require('async');

module.exports = function(task, done) {

    return function(err, results) {
        var eventHeader = task.eventHeader + "[finishTask] ";
        if(err) logme.error(eventHeader, "Problem processing request:", JSON.stringify(err));

        // send final report of task to engineer & close smtp-pool transport
        logme.info(task.eventHeader + '[report] ' + 'Finished task. Sending summary report to engineer');
        task.report.send(results, function(err) {
            eventHeader += "[cleanup]";
            if(err) logme.error(eventHeader, "Problem processing request:", JSON.stringify(err));

            logme.debug(eventHeader, 'Closing smtp transport pool');
            task.transport.close();
            logme.info(eventHeader, 'Successfully processed request');
            done();
        });
    };

};
