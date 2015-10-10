var async = require('async'),
    logme = require('logme'),
    Report = require('./report'),
    api = require('express-api-helper'),
    transport = require('./transport'),
    finishTask = require('./finishTask');

// create a global queue that your whole server shares
var queue = async.queue(function(taskHandler, done) {
    // call 'process' function on the taskHandler that I pushed in
    taskHandler.process(done);
}, 1);


// http request handler
module.exports = function(req, res, next) {
    var request = req.body;
    var eventHeader = '[taskHandler] [' + request.engineer + '] ';
    logme.info(eventHeader, 'Request rcvd for', req.body.engineer, 'to process', req.body.emails.length, 'email(s)');
    // create a task handler that does a eachLimit on the emails
    // it will processEmail and sendReport when done
    var taskHandler = {
        process: function(done) {

            // Common task data needed by each item when sending mail
            // Create one transport and report for entire task
            logme.debug(eventHeader, 'Creating task: transport, report, mailOptions');
            var novellTransport = transport.novell(request.engineer, request.password),
                report = new Report({
                    engineer: request.engineer, 
                    transport: transport.notify(),
                    content: request.content + request.signature
                });
            var task = { 
                owner: request.engineer,
                report: report,
                transport: novellTransport,
                mail: {
                    fromUser: request.fromUser,
                    ccSupport: request.ccSupport,
                    activityCode: request.activityCode,
                    content: request.content,
                    signature: request.signature
                },
                req: req,
                res: res
            };

            // Iterate through mail items to validate, prep, send
            logme.info(eventHeader, 'Preparing mail item(s) with options (fromUser|ccSupport|activityCode):',task.mail.fromUser,task.mail.ccSupport,JSON.stringify(task.mail.activityCode)); 
            async.map(
                request.emails, 
                require('./processItem')(task), 
                finishTask(task) // send report & cleanup
            );      

        }
    };

    queue.push(taskHandler);
    
    // send response that their work has been queued
    api.ok(req, res, 'Task has been queued!');
};

// Convert object to array
// var items = Object.keys(request.emails).map(function(key){
//     return request.emails[key];
// });