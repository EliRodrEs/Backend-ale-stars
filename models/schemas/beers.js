const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let cervezaSchema = new Schema({
    name: { type: String, require: true },
    country: { type: String, require: true },
    brewery: {type: String, require: false},
    type: { type: String, require: true },
    style: { type: String, require: true },
    grad: { type: Number, require: true },
    description: { type: String, require: false },
    favRating: {type: Number, require:true}
})

module.exports = cervezaSchema