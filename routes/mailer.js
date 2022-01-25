const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { AES, enc } = require("crypto-js");
const fs = require("fs");
const path = require("path");
router.get("/files", (request, response) => {
  try {
    const files = fs.readdirSync(path.join(__dirname, "../public/documents/"));
    return response.status(200).json({ filenames: files });
  } catch (e) {
    return response.status(500).json({ e: e });
  }
});
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
    subject: "แบบ", // Mail subject
    html: request.body.mailTemplate, // HTML body
    attachments: request.body.fileSelect.map((item) => ({
      // utf-8 string as an attachment
      filename: item,
      content: fs.createReadStream(
        path.join(__dirname, "../public/documents/" + item)
      ),
    })),
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      return response.status(500).json({ e: err });
    } else return response.status(200).json(info);
  });
});

module.exports = router;
