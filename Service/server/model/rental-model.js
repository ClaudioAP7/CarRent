var mongoose = require("mongoose");
var Schema = mongoose.Schema;
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
    car: { type: Object, required: true, ref: 'Car' },
    renta_days: { type: Number, required: true },
  },
  total: { type: Number, required: true },
  picked_in: { type: String, required: true, validate: validateBranchOffice },
  returned_in: { type: String, required: true, validate: validateBranchOffice },
  is_closed: { type: Boolean, required: true, default: false }
}, { timestamps: true });

Rental.methods.generateCarRent = async function (){
  let totalPrice = this.detail.car.price * this.detail.renta_days;
  this.total = totalPrice;
  await this.detail.car.setValues(false);
  this.save();
  let auxDetail = { ...this.detail.toObject()};
  delete auxDetail.car.image;
  delete auxDetail.car.available;
  return {
    user: this.user,
    detail: auxDetail,
    total: this.total,
    picked_in: this.picked_in,
    returned_in: this.returned_in
  };
};

Rental.methods.returnCar = async function (){
  this.is_closed = true;
  console.log('-----> ',this.total);
  await this.detail.car.setValues(true, this.returned_in);
  this.save();
  let auxDetail = { ...this.detail.toObject()};
  delete auxDetail.car.image;
  delete auxDetail.car.available;
  return {
    detail: auxDetail,
    total: this.total
  };
};

const model = mongoose.model("Rental", Rental);

module.exports = model;