const dbConfig = require("../configs/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tickets = require("./ticket.model.js")(mongoose);

module.exports = db;

