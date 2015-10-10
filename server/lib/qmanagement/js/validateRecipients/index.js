var getRecipients = require('./getRecipients'),
    logme = require('logme');

// process an email item
// roll task/item into a config object
module.exports = function(mail, task) {

	return function(cb) {

		var eventHeader =  '[processEmail] [' + task.owner + ']';
	    // get validated list of recipients
	    logme.debug(eventHeader, 'Validating recipient email addresses');
	    mail.recipients = getRecipients([mail.PRIMARYEMAIL, mail.ALTERNATECONTACT]);
	    logme.debug(eventHeader, 'Validated recipients: ', mail.recipients);

	    console.log(mail, task.owner);
	    cb(null, mail, task);

	};

};