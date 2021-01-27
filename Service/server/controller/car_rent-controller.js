/* Requires */
const CarModel = require('../model/car-model');

/* Error management */
function errorManagement(err, next, document){
    if(err){
        return next(err);
    }
    if(!document){
        const error = new Error("Car Rent not found");
        error.statusCode = 500;
        return next(error);
    }
}

/* Methods */
const addSessionCar = async (request, response, next) => {
    try {
        if(!request.carDocument){
            const error = new Error('Car Rent is empty');
            error.statusCode = 404;
            throw (error);
        }
        
        let carSession = {
            carId: request.carDocument._id.toString(),
            price: request.carDocument.price,
            picked_in: request.carDocument.branch_office
        }

        request.session.car = request.session.car ? request.session.car : carSession;
        
        if(request.session.car){
            request.session.car = request.session.car.carId.toString()!=request.carDocument._id.toString() ? carSession : request.session.car;
        }

        response.json({
            result: true,
            data: request.session.car
        });
    }catch (error){
        next(error);
    }
};

const getSessionCar = async (request, response, next) => {
    try {
        let car = request.session.car ? request.session.car : undefined;

        if(!car){
            const error = new Error('Car Rent is empty');
            error.statusCode = 404;
            throw (error);
        }
        
        let carId = request.session.car.carId;
        let carDocument = await CarModel.findById(carId).select('-image').exec();

        response.json({
            result: true,
            data: carDocument
        });
    } catch (error) {
        next(error)
    }
}

/* Methods Exports */
module.exports = { addSessionCar, getSessionCar };