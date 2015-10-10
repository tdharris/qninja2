var logme = require('logme'),
    async = require('async'),
    validateRecipients = require('./validateRecipients'),
    createMail = require('./createMail'),
    sendMail = require('./sendMail'),
    addToReport = require('./report/addToReport');

module.exports = function(task) {

    return function(mail, done) {
       console.log(mail);
        console.log(task.owner);
        console.log(done);
        console.log("-----------------");

        var eventHeader = '[processItem] [' + task.owner + ']';
        logme.info(eventHeader, 'Beginning to process request');

        // mail: the item being processed from the list
        // task: the object containing request-specific details, info needed during every iteration
        async.waterfall([
            validateRecipients(mail, task), 
            createMail, 
            sendMail,
            addToReport
        ], function(err, mail, task){
            if(err) done(err, mail, task);
            else done(null, mail, task);
        }); 
    };

}