const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { AES, enc } = require("crypto-js");

router.post("/", (request, response) => {
  console.log(request.body);
  const bytes = AES.decrypt(
    "U2FsdGVkX1+jyAPVAfNQrkURwhVy+sXZeBbmiFa52N4=",
    process.env.SECRETE
  );
  const password = bytes.toString(enc.Utf8);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nuttakarn.test@gmail.com", // your email
      pass: password, // your email password
    },
  });

  let mailOptions = {
    from: "no-reply", // sender
    to: "nuttakarngg@gmail.com", // list of receivers
    subject: "Hello from sender", // Mail subject
    html: request.body.mailTemplate, // HTML body
    attachments: [],
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) return response.status(500).json(err);
    else return response.status(200).json(info);
  });
});

module.exports = router;
