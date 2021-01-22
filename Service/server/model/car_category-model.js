var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/* Schema */
var Category = new Schema({
    name: { type: String, required: true }
}, { timestamps: true });


const model = mongoose.model("CarCategory", Category);

module.exports = model;
