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
    // whom to send email
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  // recipients are array of objects with email inside each
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.trackingSettings();
    const clickTracking = new helper.addClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
}

module.exports = Mailer;
