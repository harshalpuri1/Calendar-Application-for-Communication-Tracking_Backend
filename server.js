const express = require('express');
const cors = require('cors');
const routes = require('./src/routes.root');
const bodyParser = require('body-parser');
const errorHandler = require('./src/v1/auth/middlewares/errorhandler');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(errorHandler);

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Welcome to the Calendar Application for Communication Tracking, Your service is live 🎉');
});

app.use((err, req, res, next) => {    
    if (err.isBoom) {
      const { output } = err; 
    const{statusCode,message} = output.payload;
      res.status(output.statusCode).json( {status:false,statusCode,message});
    } else {
      res.status(500).json({ status:false, statusCode: 500, message:"Internal Server Error" });

    } 
  });

module.exports = app;