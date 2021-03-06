const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/server')

mongoose.connect('mongodb://localhost/test');

const index = require('./routes/index'),
      userRoute = require('./user/userRoute'),
      metricRoute = require('./metric/metricRoute'),
      classRoute = require('./class/classRoute'),
      authorRoute = require('./author/authorRoute'),
      projectRoute = require('./project/projectRoute');

function validateToken(){
    return jwt.verify(req.token, config.secretKey);
}

function verifyToken(req, res, next){
      const bearerHeader = req.headers.authorization;
      if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
      }else{
            res.sendStatus(404);
      }
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use('/', verifyToken, index);
app.use('/user',verifyToken , userRoute);
app.use('/metric', metricRoute);
app.use('/class', classRoute);
app.use('/author', authorRoute);
app.use('/project', projectRoute);



module.exports = app;

