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

Car.methods.setAvailability = async function (){
  this.available = true;
  this.save();
}

Car.methods.setBranchOffice = async function (value){
  this.branch_office = value;
  this.save();
}

const model = mongoose.model("Car", Car);

module.exports = model;