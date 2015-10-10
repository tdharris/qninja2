var myUtil = require('../util'),
    logme = require('logme');

module.exports = function(mail, task, cb) {

    var eventHeader = task.eventHeader + '[createMail]',
        from = "support@novell.com";

    logme.debug(eventHeader, 'Preparing mail by creating mailOptions')
    if(task.fromUser || myUtil.isEmpty(task.fromUser)) {
        from = mail.ENGINEER.toLowerCase() + "@novell.com";
    };

    var subject = "SR " + mail.SR + " - " + mail.BRIEF;
    if(typeof mail.activityCode !== "undefined") subject += " " + mail.activityCode;

    mail.mailOptions = {
        from: from,
        to: mail.recipients.join(','),
        cc: mail.ccSupport,
        subject: subject,
        html: task.mail.content + task.mail.signature
    };

    cb(null, mail, task);
    
};