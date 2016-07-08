var nodemailer = require('nodemailer'),
    smtpPool = require('nodemailer-smtp-pool'),
    smtpTransport = require('nodemailer-smtp-transport'),
    logme = require('logme');

exports.createEngineerTransport = function(credentials, eventHeader) {
    var eventHeader = eventHeader + "[transport]";
    
    logme.debug(eventHeader, "Creating microfocus smtp transport with engineer's credentials");
    var transport = nodemailer.createTransport(smtpPool({
        host: "mail.microfocus.com",
        secureConnection: false, // TLS requires secureConnection to be false
        tls: {
            ciphers:'SSLv3',
            rejectUnauthorized: false
        },
        port: 25,
        auth: {
            user: credentials.engineer,
            pass: credentials.password
        },
        // use up to 5 parallel connections
        maxConnections: 5,
        // no not send more than 5 messages in a second
        rateLimit: 5,
        debug: true
    }));

    if(transport == null || transport == undefined) logme.error(eventHeader, "Problem creating transport", JSON.stringify(transport));
    else {
        logme.debug(eventHeader, "Created transport successfully");
        return transport;
    }

}

exports.notify = function() {
    return nodemailer.createTransport(smtpTransport({
        host: 'mymobile.lab.novell.com',
        port: 25,
        auth: {
            user: 'qninja',
            pass: 'novell'
        },
        secure:false,
        tls: {rejectUnauthorized: false},
        debug:true
    }));
}