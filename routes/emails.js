const express = require('express')
const router = express.Router()
const { json } = require("express");
const nodemailer = require("nodemailer")

const app = express();


app.use(json());


router.route('/send-email')
  .post((req, res) => { 
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
          user: 'testmycode913@gmail.com',
          pass: 'testmycode'
      }
  });
    const mailOptions = {
      from: req.body.email,
      to: "testmycode913@gmail.com",
      subject: req.body.subject,
      text: req.body.question
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if(error){
        res.status(500).send(error.message)
      } else {
        console.log("El mail se ha enviado bien")
        res.status(200).json(req.body)
      }
    })
  });

module.exports = router