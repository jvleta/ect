const functions = require('firebase-functions');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {user: '', pass: process.env.EMAIL_SECRET},
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', {structuredData: true});

  const name = request.query.name;

  const mailOptions = {
    from: '',
    to: '',
    subject: 'Sending Email using Node.js',
    text: `That was easy! - ${name}`,
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  response.send(`Hello ${name} from Firebase!`);
});
