var logme = require('logme'),
    async = require('async'),
    validateRecipients = require('./validateRecipients'),
    createMail = require('./createMail'),
    sendMail = require('./sendMail'),
    addToReport = require('./report/addToReport');

module.exports = function(task) {

    return function(mail, done) {
        logme.info(task.eventHeader, 'Beginning to process request');

        // mail: the item being processed from the list
        // task: the object containing request-specific details, info needed during every iteration
        async.waterfall([
            validateRecipients(mail, task), 
            createMail, 
            sendMail,
            addToReport
        ], done); 
    };

};