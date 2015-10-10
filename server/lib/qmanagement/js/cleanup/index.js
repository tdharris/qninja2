var logme = require('logme'),
    async = require('async');

module.exports = function(err, cb) {

    var eventHeader = "[taskHandler] [cleanup]";
    if(err) logme.error(eventHeader, "Problem processing request:", JSON.stringify(err));

    task.transport.close(); // close the smtp-transport-pool
    logme.debug('[cleanup] [' + task.owner + '] Finished task cleanup');
    logme.info(eventHeader, "Successfully processed request");

};
