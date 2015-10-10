var logme = require('logme');

module.exports = function(mail, task, cb) {

    var eventHeader = task.eventHeader + '[sendMail] ';

    // Send mail through transport
    logme.debug(eventHeader + 'Sending: ' + mail.mailOptions.);
    task.transport.sendMail(mail.mailOptions, function(err, info){
        var message;
        mail.results = {
            err: null,
            info: null
        };
           
        if(err) {
            logme.error(eventHeader, 'Failed to send: ', err + ' | To:' + 
                mail.mailOptions.to + ' Cc:' + mail.mailOptions.cc + ' From:' + 
                mail.mailOptions.from + ' Subject:' + mail.mailOptions.subject);
            logme.error(eventHeader, err.stack);

            mail.results.err = err;
            
        } else {
            mail.results.info = info;
            logme.info(eventHeader, 'Sent: ' + info.message + ' | To:' 
                + mail.mailOptions.to + ' Cc:' + mail.mailOptions.cc + 
                ' From:' + mail.mailOptions.from + ' Subject:' + mail.mailOptions.subject);

        };

        cb(null, mail, task);
    });
    
};