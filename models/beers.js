const mongoose = require("mongoose");
const beerSchema = require("./schemas/beers");

const beerModel = mongoose.model("beers", beerSchema);

module.exports = beerModel;