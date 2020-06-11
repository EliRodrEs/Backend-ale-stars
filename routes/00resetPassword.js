const express = require("express");
const router = express.Router();
const Usuario = require('../models/users')
const firebase = require("firebase");
const jwt = require("jsonwebtoken");
const config = require('../config');



router.route('/auth/resetPassword')
    .post(async(req, res) => {
      let email = req.body.email
      let foundEmail = await Usuario.findOne({email: email})
      
      if (!foundEmail) {
        res.status(404).json({'message': 'This email does not exist in our database'})
        return
      }
      
      try {
        let auth = await firebase.auth().sendPasswordResetEmail(email)
        res.json({'message': 'Do not panic, we have sent you an email to reset your password'})

      } catch(e) {
        res.status(401).json({'message': 'e.message'})
      }
      
    })

module.exports = router
