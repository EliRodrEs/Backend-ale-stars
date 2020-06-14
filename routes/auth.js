const express = require("express");
const router = express.Router();
const Usuario = require('../models/users')
const firebase = require("firebase");
const jwt = require("jsonwebtoken");
const config = require('../config');



router.route('/auth')
    .post(async(req, res) => {
    try {
        let auth = await firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)

        let usuarioMongo = await Usuario.findById(auth.user.uid).exec()

        let payload = {
            id: auth.user.uid,
            profile: usuarioMongo.profile,
            email: usuarioMongo.email
        };
        let token = jwt.sign(payload, config.jwtKey)

        if (!token) {
            res.status(500).json({ 'message': 'No ha sido posible iniciar sesión con el usuario. Inténtalo más tarde' })
            return
        }
        res.json({ 
          'token': token,
          'email': usuarioMongo.email, 
          'name': usuarioMongo.name,
          'id': usuarioMongo.id,
          'beerFav': usuarioMongo.beerFav,
          'beerHate': usuarioMongo.beerHate,
          'beerWish': usuarioMongo.beerWish,
          'beerDone': usuarioMongo.beerDone
      })
    } catch (e) {
        console.error(e)
        res.status(401).json({ message: e.message });
    }
    })


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
