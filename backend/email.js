const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pathfindermessagealert@gmail.com',
    pass: 'srpbicgxugfaokoo'
  }
});



exports.sendNewMessageAlert = async (recipientEmail, message, senderName) => {
  /*
    var mailOptions = {
        from: 'pathfindermessagealert@gmail.com',
        to: recipientEmail,
        subject: `New Message from ${senderName}`,
        html: `<h1>New Message from ${senderName}!</h1><p>login to pathfinder.com to see what was said.</p>`
      };
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
    */
   console.log("send email temporarily disabled cause spam");
}