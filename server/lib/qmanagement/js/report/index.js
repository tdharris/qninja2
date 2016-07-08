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

    send: function(results, done) {
        logme.debug("[IMPORTANT]", JSON.stringify(results));
        var self = this;
        var content = swig.renderFile("./views/qmanagement/report/report.jade", {
                messages: results,
                content:  self.content
            });

        var mailOptions = {
            from: "qninja <qninja@mymobile.lab.novell.com>",
            to: this.engineer + "@microfocus.com",
            subject: "[qninja] Email Report",
            html: content
        };

        this.transport.sendMail(mailOptions, function(error, response){
            // close the transport first
            self.transport.close();
            
            // exit early if there's an error
            if(error) { 
                logme.error('[qManagement] [report] Error sending report: ', error);
                done(error);
            } else {
                logme.info('[qManagement] [report] Sent Report to ', mailOptions.to + ', with response: ', response.response, response.messageId);
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