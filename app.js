var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var apiRoute = require('./routes/api.server.route');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoute);

module.exports = app;

/*{
    "name": "k1 jo",
    "price": 29.99,
    "description": "Asomethin irrelevantt.",
    "quantity": 10,
    "category": "T-Shirts",
    "_id": "654d1289e8796ad1f34d0cf6",
    "__v": 0
}*/