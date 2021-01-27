/* Requires */
const CarModel = require('../model/car-model');

/* Error management */
function errorManagement(err, next, document){
    if(err){
        return next(err);
    }
    if(!document){
        const error = new Error("Car not found");
        error.statusCode = 500;
        return next(error);
    }
}

/* Methods */
const saveCar = (request, response, next) => {
    let data = {
        patent: request.body.patent,
        brand: request.body.brand,
        model: request.body.model,
        image: request.files.image,
        color: request.body.color,
        age: request.body.age,
        available: request.body.available,
        price: request.body.price,
        category_car: request.body.category_car,
        branch_office: request.body.branch_office
    };

    let carModel = new CarModel(data);

    carModel.save((error, document) =>{
        if(error || !document) return errorManagement(error, next, document);

        document = document.toObject();
        delete document.image;

        response.json({
            result: true,
            data: document
        });
    });
};

const listCar = (request, response, next) => {
    CarModel.find().exec((error, document) =>{
        if(error || !document) return errorManagement(error, next, document);

        //document.forEach(element => delete element.image);

        response.json({
            result: true,
            data: document
        });
    });
}

const getCarById = (request, response, next) => {
    let id = request.params.id;

    CarModel.findById(id, (error, document) => {
        if(error || !document) return errorManagement(error, next, document);

        let carData = document.toObject();
        delete carData.image;

        response.json({
            result: true,
            data: carData
        });
    });
};

const getCarsByBranches = (request, response, next) => {
    let branch = request.params.branch;
    CarModel.find().where({ branch_office: branch })
    .exec((error, document) => {
        if(error || !document) return errorManagement(error, next, document);

        response.json({
            result: true,
            data: document
        });
    });
};

const updateCarById = (request, response, next) => {
    let id = request.params.id;
    
    CarModel.findByIdAndUpdate(id, request.body, { new: true }, (error, document) => {
        if (error || !document) return errorManagement(error, next, document);

        response.json({
        result: true,
        data: document
        })
    });
};

const getCarByIdToParams = (request, response, next, id) => {
    CarModel.findById(id).where({ available: true })
    .exec((error, document) => {
        if(error || !document) return errorManagement(error, next, document);

        request.carDocument = document;
        next();
    });
};

/* Methods Exports */
module.exports = { saveCar, listCar, getCarById, updateCarById, getCarByIdToParams, getCarsByBranches };