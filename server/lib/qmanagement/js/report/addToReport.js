var logme = require('logme');

module.exports = function(mail, task, cb) {

	var eventHeader = task.eventHeader + '[report]',
		mailInfo = '<b>To: </b>' + mail.mailOptions.to + ' <b>Cc: </b>' + mail.mailOptions.cc +
			' <b>From: </b>' + mail.mailOptions.from + ' <b>Subject: </b>' + mail.mailOptions.subject;

    logme.info(eventHeader, 'Generating report details');

    // Determine message details
    if(mail.results.err) mail.results.reportMessage = 'Failed to send: <b style="color: red">' + mail.results.err + '</b> | ' + mailInfo;
    else mail.results.reportMessage = 'Sent: <b style="color: green">' + mail.results.info.message + ' ✔</b> | ' + mailInfo;

    cb(null, mail.results.reportMessage);

};