/* Requires */
const RentalModel = require('../model/rental-model');
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
const listRent = (request, response, next) => {
    RentalModel.find().exec((error, document) => {
        if(error || !document) return errorManagement(error, next, document);

        response.json({
            result: true,
            data: document
        });
    });
};

const getRentById = (request, response, next) => {
    let id = request.params.id;

    RentalModel.findById(id, (error, document) => {
        if(error || !document) return errorManagement(error, next, document);

        response.json({
            result: true,
            data: document
        });
    });
};

const generateCarRent = async (request, response) => {
    let car = request.session.car ? request.session.car : undefined;

    if(!car){
        return response.json({
          result: false,
          message: 'Car Rent is empty'
        })
    }
    let carId = request.session.car.carId;
    let carDocument = await CarModel.findById(carId).select('-image').exec();
    let userDocument = request.userDocument;

    let auxCarRent = {
        user: {
            userId: userDocument._id,
            name: userDocument.name,
            email: userDocument.email
        },
        detail: {
            car: carDocument,
            renta_days: request.body.rentaDays,
        },
        picked_in: request.body.picked_in,
        returned_in: request.body.returned_in
    };

    let auxResponse =  await new RentalModel(auxCarRent).generateCarRent();
    request.session.car = undefined;
    
    response.json({
        result: true,
        data: auxResponse
    });
};

const returnCar = async (request, response) => {
    let userDocument = request.userDocument;
    
    let rentDocument = await RentalModel.findOne({"user.userId": userDocument._id}).exec();
    let carDocument = await CarModel.findById(rentDocument.detail.car._id).select('-image').exec();
    rentDocument.detail.car = carDocument;
    let auxResponse =  await new RentalModel(rentDocument).returnCar();

    response.json({
        result: true,
        data: auxResponse
    });
};

/* Methods Exports */
module.exports = {
    generateCarRent, 
    returnCar, 
    listRent,
    getRentById
};