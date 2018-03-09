const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/dev');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    // who's email getting send from
    this.from_email = new helper.Email('no-reply@feedback.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
  }
}

module.exports = Mailer;
