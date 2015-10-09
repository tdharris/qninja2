var logme = require('logme'),
    swig  = require('swig'),
    path = require('path');

var Report = module.exports = function(obj) {
    this.engineer = obj.engineer;
    this.transport = obj.transport;
    this.content = obj.content || '';
    this.responses = [];
    // var file = ;
    // console.log(typeof file, file);
    // this.htmlReport = swig.compileFile(file);
};

Report.prototype = {

    send: function(done) {
        var self = this,
            content = swig.renderFile("./views/qmanagement/report/report.html", {
                messages: self.responses,
                content:  self.content
            });

        var mailOptions = {
            from: "qNinja <qNinja@mymobile.lab.novell.com>",
            to: this.engineer + "@novell.com",
            subject: "[qNinja] Email Report ✔",
            html: content
        };

        this.transport.sendMail(mailOptions, function(error, response){
            // close the transport first
            self.transport.close();
            
            // exit early if there's an error
            logme.debug(JSON.stringify(response));
            if(error) { 
                logme.error(error);
                done(error);
            } else {
                logme.info('Sent Report: messageId', response.envelope.messageId + ' | To:', mailOptions.to);
                done(null);
            };
        });
        
        // fs.readFile(__dirname + '/report.html', 'utf8', function(err, html) {
        //     if (err) logme.error('There was a problem reading report.html', err);
        //     else {
        //         mailOptions.html = html;

        //         self.transport.sendMail(mailOptions, function(error, response){
        //             // close the transport first
        //             self.transport.close();
                    
        //             // exit early if there's an error
        //             if(error) { 
        //                 logme.error(error);
        //                 return done(error, null);
        //             }

        //             logme.info('Sent Report:', response.message + ' | To:', mailOptions.to);
        //             done();
        //         });
        //     }

        // });
        

        

    }
}