const express = require('express')
const router = express.Router()
const Cerveza = require("../models/beers");
const jwt = require("jsonwebtoken");
const mustAuth = require("../middlewares/mustAuth");
const bearerToken = require("express-bearer-token");
const firebase = require("firebase");
const config = require("../config.js");
const app = express();
const { json } = require("express");


app.use(json());
app.use(bearerToken());


router.route('/beers')
/*     .get(async(req, res) => {
        let beerList = await Cerveza.find().exec();

        res.json(beerList);
    })
 */
.get(async(req, res) => {
    const qType = req.query.type
    const qStyle = req.query.style
    const qGrad = req.query.grad
    const qCountry = req.query.country
    
    const query = buildQuery(qType, qStyle, qGrad, qCountry)
    console.info("Query: ", query);
    let beerList = await Cerveza.find(query).exec();
res.json(beerList);
})



    .post(/* mustAuth() , */async(req, res) => { //SÓLO LOS PREMIUM
      try {
          let beerInDatabase = {
            name: req.body.name,
            country: req.body.country,
            brewery: req.body.brewery,
            type: req.body.type,
            style: req.body.style,
            grad: req.body.grad,
            description: req.body.description
          };

          let newBeer = await new Cerveza(beerInDatabase).save()
          let beerJSON = newBeer.toJSON()

          res.status(201).json(beerJSON);

      } catch (e) {
          res.status(404).json({ message: e.message })
          return
      }
  })


router.route('/beers/:id')
  .get(async(req, res) => {
    try {

        let beerList = req.app.get('beers')
        let searchId = req.params.id

        let foundBeer = await Cerveza.findById({ _id: searchId }).exec()

        if (!foundBeer) {
            res.status(404).json({ 'message': 'El elemento que intentas obtener no existe' })
            return
        }

        res.json(foundBeer)
    } catch (e) {
        res.status(404).json({ message: e.message })
    }
  })
  .delete(/* mustAuth(), */async(req, res) => { //Como hacer para que cada uno sólo pueda borrar la suya Y SÓLO LOS PREMIUM
    try {
        let searchId = req.params.id
        let deleteBeer = await Cerveza.deleteOne({ _id: searchId })



        if (deleteBeer.deleteCount === 0) {
            res.status(404).json({ 'message': 'El elemento que intentas eliminar no existe' })
            return
        }
        console.info(deleteBeer)
        res.status(204).json
    } catch (err) {
        res.status(500).json({ 'message': 'No se ha podido resolver la solicitud' })
    }
    res.status(204).json()
  })
  .put(/* mustAuth(), */ async(req, res) => { //Como hacer para que cada uno sólo pueda editar la suya Y SÓLO LOS PREMIUM
    try {
        let searchId = req.params.id
        let updateBeer = await Cerveza.findOneAndUpdate(searchId, req.body, { new: true })

        if (!updateBeer) {
            res.status(404).json({ 'message': 'El elemento que intentas editar no existe' })
            return
        }
        res.json(updateBeer)
    } catch (err) {
        res.status(500).json({ 'message': 'No se ha podido resolver la solicitud' })
    }
})



function gradToRange(value) {
    switch (value) {
        case 1: return {$lt:6};
        case 2: return {$gte:6, $lt:9};
        case 3: return {$gte:9};
        default: {};
    }
}

function buildQuery(type, style, grad, country) {
    let query = {}
    if (type) query.type = type
    if (style) query.style = style
    if (grad) query.grad = gradToRange(grad)
    if (country) query.country = country
return query     		
}

module.exports = router