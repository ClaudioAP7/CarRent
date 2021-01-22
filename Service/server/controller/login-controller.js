/* Requires */
const UserModel = require('../model/user-model');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/* Error management */
function errorManagement(err, next, document){
    if(err){
        return next(err);
    }
    if(!document){
        const error = new Error("User not found");
        error.statusCode = 500;
        return next(error);
    }
}

/* Methods */
const login = (request, response, next) => {
    let email = request.body.email;
    let password = request.body.password;

    UserModel.findOne({ email: email}, (error, document) => {
        if(error || !document) return errorManagement(error, next, document);
    
        if (!bcrypt.compareSync(password, document.password) ){
          return response.status(401).json({
            result: true,
            message: 'User or password incorrect'
          });
        }
    
        let payload ={
          userId: document._id,
          role: document.role
        }

        let token = jwt.sign(
          payload,
          process.env.SEED,
          { expiresIn: process.env.TOKEN_EXPIRATION  }
        );
    
        let user = document.toObject();
        delete user.password;
    
        response.json({
          result: true,
          data: {
            userId: document._id,
            role: document.role,
            token: token
          }
        });
    });
};

const logout = (request, response) => {
    if(request.session){
        request.session.destroy( document => {
            response.json({
                result: true
            });
        });
    };
};

const signup = (request, response, next) => {
    let salt = parseInt(process.env.SALTH)
    let data = {
      name : request.body.name,
      email: request.body.email,
      phone: request.body.phone,
      password: bcrypt.hashSync(request.body.password, salt),
      role : request.body.role
    };
  
    let userModel = new UserModel(data);
  
    userModel.save((error, document) => {
      if (error || !document) return errorHandler(error, next, document);
  
      response.json({
        result: true,
        data: document
      });
    });
}

/* Methods Exports */
module.exports = {
    login,
    logout,
    signup
};