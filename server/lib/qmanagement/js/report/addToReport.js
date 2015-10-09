var logme = require('logme');

module.exports = function(task) {

	return function(mail, cb) {
		var eventHeader = '[report] [' + task.owner + ']',
			mailInfo = '<b>To: </b>' + mail.mailOptions.to + ' <b>Cc: </b>' + mail.mailOptions.cc +
				' <b>From: </b>' + mail.mailOptions.from + ' <b>Subject: </b>' + mail.mailOptions.subject;

	    logme.info(eventHeader, 'Appending results to report');

	    // Determine message details
	    if(mail.results.err) mail.results.reportMessage = 'Failed to send: <b style="color: red">' + mail.results.err + '</b> | ' + mailInfo;
	    else mail.results.reportMessage = 'Sent: <b style="color: green">' + mail.results.info.message + ' ✔</b> | ' + mailInfo;

	    // Append to report 
	    task.report.responses.push(mail.results.reportMessage);

	    cb(null, mail);
	};

};