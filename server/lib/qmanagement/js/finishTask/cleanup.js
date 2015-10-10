var logme = require('logme');

module.exports = function(task) {

    return function(err) {
        var eventHeader = "[cleanup] [" + task.owner + "] ";
        if(err) logme.error(eventHeader, "Problem processing request:", JSON.stringify(err));

        task.transport.close(); // close the smtp-transport-pool
        logme.debug(eventHeader, 'Finished task cleanup');
        logme.info(eventHeader, 'Successfully processed request');
    };
    
};
