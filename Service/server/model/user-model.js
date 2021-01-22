var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/* Schema */
var User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "BASIC_USER" },
  available: { type: Boolean, required: true, default: true },
}, { timestamps: true });

const model = mongoose.model("User", User);

module.exports = model;