var logme = require('logme');

module.exports = function(mail, task, cb) {

	var eventHeader = task.eventHeader + '[report]';
		// mailInfo = '<b>To: </b>' + mail.mailOptions.to + ' <b>Cc: </b>' + mail.mailOptions.cc +
		// 	' <b>From: </b>' + mail.mailOptions.from + ' <b>Subject: </b>' + mail.mailOptions.subject;

    // Determine message details
    // if(mail.results.err) mail.results.message = 'Failed to send: <b style="color: red">' + mail.results.err + '</b> | ' + mailInfo;
    // else mail.results.message = 'Sent: <b style="color: green">' + mail.results.info.message + ' ✔</b> | ' + mailInfo;

    // mail.response = mail.results.err.response || mail.results.info.response,
    mail.response.subject = mail.mailOptions.subject;

    cb(null, mail.response);

};