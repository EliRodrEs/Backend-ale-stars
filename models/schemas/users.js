const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    email: { type: String, require: true },
    name: { type: String, require: true },
    surname: { type: String, require: true },
    _id: { type: String, require: true },
    profile: { type: String, require: true }
})

module.exports = usuarioSchema