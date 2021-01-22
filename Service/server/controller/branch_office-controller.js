/* Requires */
const BranchOfficeModel = require('../model/branch_office-model');

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
const saveBranchOffice = (request, response, next) => {
    let data = { 
        direction: request.body.direction,
        contact_phone: request.body.contact_phone,
        email: request.body.email
    };
    let branchOfficeModel = new BranchOfficeModel(data);
    
    branchOfficeModel.save((error, document) =>{
        if(error || !document) return errorManagement(error, next, document);

        response.json({
            result: true,
            data: document
        });
    });
};

const listBranchOffice = (request, response, next) => {
    BranchOfficeModel.find().exec((error, document) => {
        if(error || !document) return errorManagement(error, next, document);

        response.json({
            result: true,
            data: document
        });
    });
};

const getBranchOfficeById = (request, response, next) => {
    let id = request.params.id;

    BranchOfficeModel.findById(id, (error, document) => {
        if(error || !document) return errorManagement(error, next, document);

        response.json({
            result: true,
            data: document
        });
    });
};

const updateBranchOfficeById = (request, response, next) => {
    let id = request.params.id;
    
    BranchOfficeModel.findByIdAndUpdate(id, request.body, { new: true }, (error, document) => {
        if (error || !document) return errorManagement(error, next, document);

        response.json({
        result: true,
        data: document
        });
    });
};

/* Methods Exports */
module.exports = {
    saveBranchOffice,
    listBranchOffice,
    getBranchOfficeById,
    updateBranchOfficeById
};