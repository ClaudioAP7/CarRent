var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/* Schema */
var BranchOffice = new Schema({
  direction: { type: String, required: true },
  contact_phone: { type: String, required: true, default: "111111111" },
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

const model = mongoose.model("BranchOffice", BranchOffice);

module.exports = model;
