/* Requires */
const UserModel = require('../model/user-model');

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
const listUser = (request, response, next) => {
    UserModel.find().exec((error, document) =>{
        if(error || !document) return errorManagement(error, next, document);

        response.json({
            result: true,
            data: document
        });
    });
}

const getUserById = (request, response, next) => {
    let id = request.params.id;

    UserModel.findById(id, (error, document) => {
        if(error || !document) return errorManagement(error, next, document);

        response.json({
            result: true,
            data: document
        });
    });
};

const updateUserById = (request, response, next) => {
    let id = request.params.id;
    
    UserModel.findByIdAndUpdate(id, request.body, { new: true }, (error, document) => {
        if (error || !document) return errorManagement(error, next, document);

        response.json({
        result: true,
        data: document
        })
    });
};

const getUserByIdToParams = (request, response, next, id) => {
    UserModel.findById(id).where({ available: true })
    .exec((error, document) => {
        if(error || !document) return errorManagement(error, next, document);

        request.userDocument = document;
        next();
    });
};

/* Methods Exports */
module.exports = { listUser, getUserById, updateUserById, getUserByIdToParams };