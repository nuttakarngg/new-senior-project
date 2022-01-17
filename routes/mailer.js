const nodemailer = require('nodemailer');

// config สำหรับของ gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yourmail@gmail.com', // your email
      pass: 'password' // your email password
    }
  });
  // config สำหรับของ outlook
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'yourmail@hotmail.com', // your email
      pass: 'password' // your email password
    }
  });

  let mailOptions = {
    from: 'sender@hotmail.com',                // sender
    to: 'receiver@hotmail.com',                // list of receivers
    subject: 'Hello from sender',              // Mail subject
    html: '<b>Do you receive this mail?</b>'   // HTML body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });