var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Car = require('../model/car-model');
const BranchOfficeModel = require('../model/branch_office-model');

/* Validators */
const validateBranchOffice = async(value) => {
    return await BranchOfficeModel.exists({ direction: value});
};

/* Schema */
var Rental = new Schema({
  user: {
    userId: { type: Schema.Types.ObjectId, ref: 'UserModel' },
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  detail: {
    car: { type: Car },
    renta_days: { type: Number, required: true },
  },
  total: { type: Number, required: true },
  picked_in: { type: String, required: true, validate: validateBranchOffice },
  returned_in: { type: String, required: true, validate: validateBranchOffice },
  date: { type: Date, required: true, default: Date.now },
}, { timestamps: true });

const model = mongoose.model("Rental", Rental);

module.exports = model;