/* Requires */
const { body, validationResult } = require('express-validator');
const { Promise } = require('mongoose');
const UserModel = require('../model/user-model');

const pSignup = [
    body("email")
      .isEmail()
      .withMessage('Enter a valid email')
      .custom( (value) => {
        return UserModel.findOne( { email: value } ).then( data =>{
          if (data){
            return Promise.reject('This email already exists')
          }
        });
      })
      .normalizeEmail(),
      
    body("name").trim()
      .not()
      .isEmpty(),

    body("password").trim()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])/)
      .withMessage("It must have numbers and lowercase and uppercase characters and one character @$.!%*#?&")
      .isLength( {min : 5} )
      .withMessage("Minimum 5 characters")
  
  ];
  
  const vSingup = (request, response, next) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
      const error = new Error('Validation Error');
      error.statusCode = 400;
      error.data = errors.array()
      return next(error);
    }
    next();
  }
  
  const validateSingup = [pSignup, vSingup ];
  
  module.exports = {
    validateSingup
  }