const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    email: { type: String, require: true },
    name: { type: String, require: true },
    surname: { type: String, require: true },
    _id: { type: String, require: true },
    profile: { type: String, require: false },
    beerFav: {type: Array, require: false},
    beerHate: {type: Array, require: false},
    beerWish: {type: Array, require: false},
    beerDone: {type: Array, require: false},
})

module.exports = usuarioSchema