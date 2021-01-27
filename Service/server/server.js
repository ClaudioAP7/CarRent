/* Third-Party Modules */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cors = require('cors');
/* Local Modules */
const carRouter = require('./router/car-router');
const categoryCarRouter = require('./router/car_category-router');
const branchOfficeRouter = require('./router/branch_office-router');
const loginRouter = require('./router/login-router');
const userRouter = require('./router/user-router');
const rentalRouter = require('./router/rental-router');
const carRentRouter = require('./router/car_rent-router');

/* Consoles */
console.log(`${ __dirname }`);
console.log(`${process.env.NODE_ENV}`);

/* Get Environment */
if (process.env.NODE_ENV === 'development'){
  require('dotenv').config( { path: `${__dirname}/../.env.development`} );
}else{
  require('dotenv').config()
}

/* Init Express */
const app = express();

/* Third-Party Middleware */
app.use(bodyParser.json());
app.use(fileUpload({
  limits: { fileSize: 1 * 1024 * 1024 },
}));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  httpOnly: false
}));
app.use(cors({
  credentials: true,
  origin: true
}));
/* Routers */
app.use('/api/v1/',carRouter);
app.use('/api/v1/',categoryCarRouter);
app.use('/api/v1/',branchOfficeRouter);
app.use('/api/v1/',loginRouter);
app.use('/api/v1/',userRouter);
app.use('/api/v1/',rentalRouter);
app.use('/api/v1/',carRentRouter);

/* HandlerError Middleware */
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

/* Connection to MongoDB and raise Server */
const URL_DATABASE = process.env.URL_MONGO;
mongoose.connect(URL_DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then( () => {
  /* Raise Server */
  app.listen(process.env.PORT , () => {
    console.log('ServerUp');
  });
}).catch((error) => console.log(error));
