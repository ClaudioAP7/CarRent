//Third-Party Modules
const express = require('express');
//Local Modules
const carRouter = require('./router/car-router');

console.log(`${ __dirname }`);
console.log(`${process.env.NODE_ENV}`);

if (process.env.NODE_ENV === 'development'){
  require('dotenv').config( { path: `${__dirname}/../.env.development`} );
}else{
  require('dotenv').config()
}

//Init Express
const app = express();

//Routers
app.use('/api/v1/',carRouter);

//HandlerError Middleware
app.use((error, request, response, next) => {
  const status = error.status || 500;
  const message = error.message;
  const data = error.data

  response.status(status).json({
    result: false,
    message: message,
    data: data
  });
});

app.listen(process.env.PORT , () => {
  console.log('ServerUp');
});