const { response } = require("express");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const CarCategoryModel = require('../model/car_category-model');
const BranchOfficeModel = require('../model/branch_office-model');

/* Validators */
const validateCarCategory = async(value) => {
    return await CarCategoryModel.exists({ name: value});
};

const validateBranchOffice = async(value) => {
    return await BranchOfficeModel.exists({ direction: value});
};

/* Schema */
var Car = new Schema({
  patent: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  image: { data: Buffer, contentType: String },
  color: { type: String },
  age: { type: String },
  available: { type: Boolean, required: true, default: true },
  price: { type: Number, required: true, default: 1000 },
  category_car: { type: String, required: true, validate: validateCarCategory },
  branch_office: { type: String, required: true, validate: validateBranchOffice },
}, { timestamps: true });

Car.methods.setValues = async function (available, branch_office){
  if(available!=undefined){
    this.available = available;
  }
  if(branch_office){
    this.branch_office = branch_office;
  }
  this.save();
}

const model = mongoose.model("Car", Car);

module.exports = model;