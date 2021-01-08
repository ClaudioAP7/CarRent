const responseServer = (request, response, next) =>{
    response.json({
        ok: true,
        message: 'The server responsed ok'
    });
};

module.exports = {responseServer};