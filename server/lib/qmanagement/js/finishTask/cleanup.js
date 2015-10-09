var logme = require('logme');

module.exports = function(task) {

    return function(cb) {
        var eventHeader = "[taskHandler] [finishTask] [cleanup] [" + task.owner + "]";
        task.transport.close(); // close the smtp-transport-pool
        logme.debug(eventHeader, 'Finished task cleanup');
    };

};
