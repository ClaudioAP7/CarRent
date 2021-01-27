/* Requires */
const RentalModel = require('../model/rental-model');
const CarModel = require('../model/car-model');

/* Error management */
function errorManagement(err, next, document){
    if(err){
        return next(err);
    }
    if(!document){
        const error = new Error("Branch Office not found");
        error.statusCode = 500;
        return next(error);
    }
}

/* Methods */
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
    
    let rentDocument = await RentalModel.findOne({"user.userId": userDocument._id}).lean().exec();
    let auxResponse =  await new RentalModel(rentDocument).returnCar();

    response.json({
        result: true,
        data: auxResponse
    });
};

/* Methods Exports */
module.exports = {
    generateCarRent, returnCar
};