var logme = require('logme');

module.exports = function(mail, task, cb) {

    var eventHeader = task.eventHeader + '[sendMail] ';

    // Send mail through transport
    logme.debug(eventHeader + 'Sending ' + mail.mailOptions.subject + ' To:' + mail.mailOptions.to + ' Cc:' + mail.mailOptions.cc + ' From:' + mail.mailOptions.from);
    task.transport.sendMail(mail.mailOptions, function(err, info){
        mail.response = null;
           
        if(err) {
            mail.response = err;
            logme.error(eventHeader, 'Failed: ' + err);
            logme.error(eventHeader, err.stack);
            
        } else {
            mail.response = info;
            logme.info(eventHeader, 'Sent: ' + info.response);

        };

        cb(null, mail, task);
    });
    
};