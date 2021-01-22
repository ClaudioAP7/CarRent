/* Requires */
const CarCategoryModel = require('../model/car_category-model');

/* Error management */
function errorManagement(err, next, document){
    if(err){
        return next(err);
    }
    if(!document){
        const error = new Error("Car Category not found");
        error.statusCode = 500;
        return next(error);
    }
}

/* Methods */
const saveCarCategory = (request, response, next) => {
    let data = { name: request.body.category_name };
    let carCategoryModel = new CarCategoryModel(data);
    
    carCategoryModel.save((error, document) =>{
        if(error || !document) return errorManagement(error, next, document);

        response.json({
            result: true,
            data: document
        });
    });
};

const listCarCategory = (request, response, next) => {
    CarCategoryModel.find().exec((error, document) => {
        if(error || !document) return errorManagement(error, next, document);

        response.json({
            result: true,
            data: document
        });
    });
};

const getCarCategoryById = (request, response, next) => {
    let id = request.params.id;

    CarCategoryModel.findById(id, (error, document) => {
        if(error || !document) return errorManagement(error, next, document);

        response.json({
            result: true,
            data: document
        });
    });
};

const updateCarCategoryById = (request, response, next) => {
    let id = request.params.id;
    let data = { name: request.body.category_name };
    
    CarCategoryModel.findByIdAndUpdate(id, data, { new: true }, (error, document) => {
        if (error || !document) return errorManagement(error, next, document);

        response.json({
        result: true,
        data: document
        });
    });
};

/* Methods Exports */
module.exports = {
    saveCarCategory,
    listCarCategory,
    getCarCategoryById,
    updateCarCategoryById
};