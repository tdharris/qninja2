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
}, 2);


// http request handler
module.exports = function(req, res, next) {
    var request = req.body;
    var eventHeader = '[qManagement] [' + request.engineer + '] ';
    logme.info(eventHeader, '[taskHandler] Request rcvd to process', req.body.emails.length, 'email(s)');
    // create a task handler that does a eachLimit on the emails
    // it will processEmail and sendReport when done
    var taskHandler = {
        process: function(done) {

            // Common task data needed by each item when sending mail
            // Create one transport and report for entire task
            logme.debug(eventHeader, '[taskHandler] Creating task: transport, report, mailOptions');
            var microFocusTransport = transport.createEngineerTransport({
                    engineer: request.engineer, 
                    password: request.password
                }, eventHeader),
                report = new Report({
                    engineer: request.engineer, 
                    transport: transport.notify(),
                    content: request.content + request.signature
                });
            var task = { 
                eventHeader: eventHeader,
                owner: request.engineer,
                report: report,
                transport: microFocusTransport,
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
            logme.info(eventHeader, '[taskHandler] Preparing mail item(s) with options (fromUser|ccSupport|activityCode):',task.mail.fromUser,task.mail.ccSupport,JSON.stringify(task.mail.activityCode)); 
            async.map(
                request.emails, 
                require('./processItem')(task), 
                finishTask(task, done) // send report & cleanup
            );      

        }
    };

    queue.push(taskHandler);
    
    // send response that their work has been queued
    api.ok(req, res, 'Task rcvd');
};

// Convert object to array
// var items = Object.keys(request.emails).map(function(key){
//     return request.emails[key];
// });