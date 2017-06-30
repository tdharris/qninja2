var myUtil = require('../util'),
    logme = require('logme');

module.exports = function(mail, task, cb) {

    var eventHeader = task.eventHeader + '[createMail]',
        from = "support@novell.com";

    logme.debug(eventHeader, 'Creating mail envelope');
    if(mail.fromUser || myUtil.isEmpty(mail.fromUser)) {
        from = mail.ENGINEER.toLowerCase() + "@microfocus.com";
    };

    var subject = "SR " + mail.SR + " - " + mail.BRIEF;
    if(task.mail.activityCode != null) subject += " " + task.mail.activityCode;

    mail.mailOptions = {
        from: from,
        to: mail.recipients.join(','),
        cc: task.mail.ccSupport,
        subject: subject,
        html: task.mail.content + task.mail.signature
    };

    cb(null, mail, task);
    
};
