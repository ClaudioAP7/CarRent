var jwt = require('jsonwebtoken');

const isAuth = (request, response, next) => {
    let token = request.get('Authorization');
    
    jwt.verify(token, process.env.SEED, (error, decoded) => {
        if(error){
            error.statusCode = 401;
            next(error);
        }

        request.user = decoded;
        next();

    });
};

const isAdmin = (request, response, next) => {
    let user = request.user;
    if(user.role === 'ADMIN_ROLE'){
      next();
    }else{
      let error = new Error('Invalid role');
      error.statusCode = 401;
      next(error)
    }
};
  
module.exports = {
    isAuth,
    isAdmin
}