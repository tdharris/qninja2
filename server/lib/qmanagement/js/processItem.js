var logme = require('logme'),
    async = require('async'),
    validateRecipients = require('./validateRecipients'),
    createMail = require('./createMail'),
    sendMail = require('./sendMail'),
    addToReport = require('./report/addToReport');

module.exports = function(mail, done) {
    console.log(mail);
    console.log(this.owner);
    console.log(done);
    console.log("-----------------");
    var task = this;

    var eventHeader = '[processItem] [' + this.owner + ']';
    logme.info(eventHeader, 'Beginning to process request');

    // mail: the item being processed from the list
    // task: the object containing request-specific details, info needed during every iteration
    async.waterfall([
        validateRecipients(mail, task), 
        createMail(task), 
        sendMail(task),
        addToReport(task)
    ], function(err, mail){
        console.log('here', JSON.stringify(task.responses));
        if(err) done(err);
        else done(null);
    });

};