var nodemailer = require('nodemailer'); 

exports.novell = function(engineer, password) {
    return nodemailer.createTransport({
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
        }
    });
}

exports.notify = function() {
    return nodemailer.createTransport("Direct");
}