const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.room = require("./room.model")(mongoose);
db.type = require("./type.model")(mongoose);
db.order = require("./order.model")(mongoose);
db.detil = require("./detil.model")(mongoose);
db.user = require("./user.model")(mongoose);


module.exports = db;