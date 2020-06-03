const mongoose = require("mongoose");
const userSchema = require("./schemas/users");

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;