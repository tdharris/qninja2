var myUtil = require('../util'),
    logme = require('logme');

module.exports = function(mail, task, cb) {

    var eventHeader = '[createMail] [' + task.owner + ']',
        from = "support@novell.com";

    logme.debug(eventHeader, 'Preparing mail by creating mailOptions')
    if(task.fromUser || myUtil.isEmpty(task.fromUser)) {
        from = mail.ENGINEER.toLowerCase() + "@novell.com";
    };

    mail.mailOptions = {
        from: from,
        to: mail.recipients.join(','),
        cc: mail.ccSupport,
        subject: "SR " + mail.SR + " - " + mail.BRIEF + " " + mail.activityCode,
        html: task.mail.content + task.mail.signature
    };

    cb(null, mail, task);
    
};