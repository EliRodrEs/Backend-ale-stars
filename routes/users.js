const express = require('express')
const router = express.Router()
const Usuario = require("../models/users");
const Cerveza = require("../models/beers")
const jwt = require("jsonwebtoken");
const mustAuth = require("../middlewares/mustAuth");
const bearerToken = require("express-bearer-token");
const firebase = require("firebase");
const config = require("../config.js");
const app = express();
const { json } = require("express");

app.use(json());
app.use(bearerToken());



router.route('/users')
    .get(async(req, res) => {
        let itemList = await Usuario.find().exec();

        res.json(itemList);
    })
    .post(async(req, res) => {
        try {
            let auth = await firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password);

            let usuarioMongo = {
                _id: auth.user.uid,
                email: req.body.email,
                name: req.body.name,
                surname: req.body.surname,
                profile: req.body.profile
            };

            let newUser = await new Usuario(usuarioMongo).save()
            let userJSON = newUser.toJSON()

            res.status(201).json(userJSON);

        } catch (e) {
            res.status(404).json({ message: e.message })
            return
        }
    })

router.route('/users/:id')
    .get(async(req, res) => {
        try {

            let userList = req.app.get('users')
            let searchId = req.params.id

            let foundUser = await Usuario.findById({ _id: searchId }).exec()

            if (!foundUser) {
                res.status(404).json({ 'message': 'El elemento que intentas obtener no existe' })
                return
            }

            res.json(foundUser)
        } catch (e) {
            res.status(404).json({ message: e.message })
        }
    })
    .delete(async(req, res) => {
        try {
         let fireUser = firebase.auth().currentUser
        fireUser.delete()

            let searchId = req.params.id
            let deleteUser = await Usuario.deleteOne({ _id: searchId })



            if (deleteUser.deleteCount === 0) {
                res.status(404).json({ 'message': 'El elemento que intentas eliminar no existe' })
                return
            }
            console.info(deleteUser)
            res.status(204).json({})
        } catch (err) {
            res.status(500).json({ 'message': 'No se ha podido resolver la solicitud' })
        }

    })
    .put(async(req,res)=>{
        let searchId = req.params.id

        let updatedUser = await Usuario.findOneAndUpdate({_id: searchId}, req.body, {new: true}).exec()

        if (!updatedUser) {
        res.status(404).json({ 'message': 'El elemento que intentas editar no existe' })
        return
        }

        res.json(updatedUser)
    })

/* ENDPOINTS DE ARRAYS PERSONALES */
router.route("/users/:id/favs")
    .patch(async(req, res) => {
        try {
        let searchId = req.params.id
        const fav = req.query.fav;
        const unfav = req.query.unfav;
        let updateUser;
        if(fav){
            updateUser = await Usuario.findOneAndUpdate({_id: searchId }, {$push:{"beerFav": fav}})
        } else {
            updateUser = await Usuario.findOneAndUpdate({_id: searchId }, {$pull:{"beerFav": unfav}})
        }
        if (!updateUser) {
            res.status(404).json({ 'message': 'El elemento que intentas editar no existe' })
            return
        }
            res.json(updateUser)
        } catch (err) {
            res.status(500).json({ 'message': 'No se ha podido resolver la solicitud' })
        }
    })
    .get(async(req, res) => {
        try {
            let searchId = req.params.id
            let userFavBeersID
            userFavBeersID = await Usuario.findOne({_id: searchId}, ['beerFav'])
            let userFavBeersComplete = await Cerveza.find({_id: {$in: userFavBeersID.beerFav}})
            res.json(userFavBeersComplete)
        } catch (err) {
            res.status(500).json({ 'message': 'No se ha podido resolver la solicitud' + err})
        }
    })

router.route("/users/:id/hates")
    .patch(async(req, res) => {
        try {
        let searchId = req.params.id
        const hate = req.query.hate;
        const unhate = req.query.unhate;
        let updateUser;
        if(hate){
            updateUser = await Usuario.findOneAndUpdate({_id: searchId }, {$push:{"beerHate": hate}})
        } else {
            updateUser = await Usuario.findOneAndUpdate({_id: searchId }, {$pull:{"beerHate": unhate}})
        }
        if (!updateUser) {
            res.status(404).json({ 'message': 'El elemento que intentas editar no existe' })
            return
        }
            res.json(updateUser)
        } catch (err) {
            res.status(500).json({ 'message': 'No se ha podido resolver la solicitud' })
        }
    })
    .get(async(req, res) => {
        try {
            let searchId = req.params.id
            let userHatedBeersID
            userHatedBeersID = await Usuario.findOne({_id: searchId}, ['beerHate'])
            let userHatedBeersComplete = await Cerveza.find({_id: {$in: userHatedBeersID.beerHate}})
            res.json(userHatedBeersComplete)
        } catch (err) {
            res.status(500).json({ 'message': 'No se ha podido resolver la solicitud' + err})
        }
    })

router.route("/users/:id/wish")
    .patch(async(req, res) => {
        try {
        let searchId = req.params.id
        const wish = req.query.wish;
        const unwish = req.query.unwish;
        let updateUser;
        if(wish){
            updateUser = await Usuario.findOneAndUpdate({_id: searchId }, {$push:{"beerWish": wish}})
        } else {
            updateUser = await Usuario.findOneAndUpdate({_id: searchId }, {$pull:{"beerWish": unwish}})
        }
        if (!updateUser) {
            res.status(404).json({ 'message': 'El elemento que intentas editar no existe' })
            return
        }
            res.json(updateUser)
        } catch (err) {
            res.status(500).json({ 'message': 'No se ha podido resolver la solicitud' })
        }
    })
    .get(async(req, res) => {
        try {
            let searchId = req.params.id
            let userWishedBeersID
            userWishedBeersID = await Usuario.findOne({_id: searchId}, ['beerWish'])
            let userWishedBeersComplete = await Cerveza.find({_id: {$in: userWishedBeersID.beerWish}})
            res.json(userWishedBeersComplete)
        } catch (err) {
            res.status(500).json({ 'message': 'No se ha podido resolver la solicitud' + err})
        }
    })

router.route("/users/:id/done")
    .patch(async(req, res) => {
        try {
        let searchId = req.params.id
        const done = req.query.done;
        const undone = req.query.undone;
        let updateUser;
        if(done){
            updateUser = await Usuario.findOneAndUpdate({_id: searchId }, {$push:{"beerDone": done}})
        } else {
            updateUser = await Usuario.findOneAndUpdate({_id: searchId }, {$pull:{"beerDone": undone}})
        }
        if (!updateUser) {
            res.status(404).json({ 'message': 'El elemento que intentas editar no existe' })
            return
        }
            res.json(updateUser)
        } catch (err) {
            res.status(500).json({ 'message': 'No se ha podido resolver la solicitud' })
        }
    })
    .get(async(req, res) => {
        try {
            let searchId = req.params.id
            let userDoneBeersID
            userDoneBeersID = await Usuario.findOne({_id: searchId}, ['beerDone'])
            let userDoneBeersComplete = await Cerveza.find({_id: {$in: userDoneBeersID.beerDone}})
            res.json(userDoneBeersComplete)
        } catch (err) {
            res.status(500).json({ 'message': 'No se ha podido resolver la solicitud' + err})
        }
    })
module.exports = router
    