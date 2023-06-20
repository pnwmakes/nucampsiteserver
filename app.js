// Import necessary modules/packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const passport = require('passport');
const config = require('./config');

// Import router modules
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');
const uploadRouter = require('./routes/uploadRouter');

const mongoose = require('mongoose');

const url = config.mongoUrl;

// Connect to the MongoDB server
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Log a success message if connected correctly to MongoDB server, error message otherwise
connect.then(
    () => console.log('Connected correctly to server'),
    (err) => console.log(err)
);

// Create an Express application
var app = express();

// Secure traffic only
app.all('*', (req, res, next) => {
    if (req.secure) {
        return next();
    } else {
        console.log(
            `Redirecting to: https://${req.hostname}:${app.get('secPort')}${
                req.url
            }`
        );
        res.redirect(
            301,
            `https://${req.hostname}:${app.get('secPort')}${req.url}`
        );
    }
});

// Set view engine and views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware configuration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// Route handling
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);
app.use('/imageUpload', uploadRouter);

// Error handling for non-existent routes
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handling middleware
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app; // Export the configured Express application
