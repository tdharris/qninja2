# qninja
Internal app for NTS Engineers to help automate workflow.
<ul>
<li>Dashboard: Environment Manager / Queue Monitor</li>
<li>qManagement: Manage work queue with mass email integrating Siebel updates</li>
<li>Notify: Queue monitor subscription service for text/email notifications</li>
<li>BugZilla-Update: Pull from /incoming or /outgoing and attach to bug# or upload to external FTP</li>
</ul>
### qManagement
Engineer’s workload management web app built with AngularJS, NodeJS and ExpressJS.

Often times we would have customers with similar issues or we'd need to send a similar email regarding follow-up. Normally, this would be done one at a time in a mail client, but qNinja allows engineers to send the same email message to various customers while still generating a separate email for each one (unique subject and recipients). It includes the necessary tags in the email to be included in the database as well, so it's as if a regular email was sent.

An NTS Engineer navigates to the url and follows these general steps:
<ul>
  <li>Enters credentials and selects 'Remember Me' for HTML5 storage of credentials and signature.</li>
  <li>Selects Refresh to pull in data regarding their Service Requests populated in the bottom panel.</li>
  <li>Select several to send emails to (perhaps change the email list, sort columns, etc.)</li>
  <li>Create the Content and Signature of the email. </li>
  <li>Select Preview for a dialog that displays what the email will look like.</li>
  <li>Click Send. A notification box is displayed reporting that a request was received by the server and queued up for processing.</li>
  <li>Monitor email for summary report delivered by qninja for detailed results</li>
</ul>

The server now does these steps:
<ul>
	<li>The server receives the request to send emails, and queues it up for the taskHandler.</li>
	<li>An smtp-transport-pool is created with the engineer's credentials used for the entire task</li>
	<li>Each mail item in the task is then processed and delivered:</li>
	<ul>
	  <li>First, all the recipients are validated and any non-emails are discarded.</li>
	  <li>A mail item or envelope is generated.</li>
	  <li>The mail is delivered through the engineer's smtp-transport-pool</li>
	  <li>The smtp deliver response and message details is returned for async.map collection.</li>
	</ul>
	<li>Once all mail items for this task have been processed and delivered, a summary report is emailed to the engineer.</li>
</ul>
