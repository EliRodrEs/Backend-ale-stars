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
        res.json({ 'token': token })
    } catch (e) {
        console.error(e)
        res.status(401).json({ message: e.message });
    }
    })

module.exports = router
