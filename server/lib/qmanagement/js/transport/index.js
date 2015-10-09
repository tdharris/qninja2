var nodemailer = require('nodemailer'),
    smtpPool = require('nodemailer-smtp-pool'),
    logme = require('logme');

exports.novell = function(engineer, password) {
    var eventHeader = "[transport] [" + engineer + "]";
    
    logme.debug(eventHeader, "Creating novell smtp transport with engineer's credentials");
    var transport = nodemailer.createTransport(smtpPool({
        host: "smtp.novell.com",
        secureConnection: false, // TLS requires secureConnection to be false
        tls: {
            ciphers:'SSLv3',
            rejectUnauthorized: false
        },
        port: 25, // port for secure SMTP
        auth: {
            user: engineer,
            pass: password
        },
        // use up to 5 parallel connections
        maxConnections: 5,
        // no not send more than 5 messages in a second
        rateLimit: 5
    }));

    if(transport == null || transport == undefined) logme.error(eventHeader, "Problem creating transport", JSON.stringify(transport));
    else {
        logme.debug(eventHeader, "Created transport successfully");
        return transport;
    }

}

exports.notify = function() {
    return nodemailer.createTransport();
}