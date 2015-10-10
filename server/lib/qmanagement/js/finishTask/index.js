var logme = require('logme'),
    async = require('async');

module.exports = function(task, done) {

    return function(err, results) {
        var eventHeader = task.eventHeader + "[finishTask] ";
        if(err) logme.error(eventHeader, "Problem processing request:", JSON.stringify(err));

        // send final report of task to engineer & close smtp-pool transport
        task.report.send(results, function(err) {
            eventHeader += "[cleanup]";
            if(err) logme.error(eventHeader, "Problem processing request:", JSON.stringify(err));

            task.transport.close(); // close the smtp-transport-pool
            logme.debug(eventHeader, 'Finished task cleanup');
            logme.info(eventHeader, 'Successfully processed request');
            done();
        });
    };

};
