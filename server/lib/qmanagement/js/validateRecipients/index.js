var getRecipients = require('./getRecipients'),
    logme = require('logme');

// process an email item
// roll task/item into a config object
module.exports = function(mail, task) {

	return function(cb) {

		var eventHeader =  task.eventHeader + '[validateRecipients]';
	    // get validated list of recipients
	    logme.debug(eventHeader, 'Validating recipient email addresses');
	    mail.recipients = getRecipients([mail.PRIMARYEMAIL, mail.ALTERNATECONTACT]);
	    logme.debug(eventHeader, 'Validated recipients: ', mail.recipients);

	    cb(null, mail, task);

	};

};