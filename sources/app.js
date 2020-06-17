/**
 * Eve Industry Helper 2020
 *
 * Created by Mia Kloxader on 03/06/20
 */

const path = require('path');
const config = require('config');

const express = require('express');
const passport = require('passport');

const app = express();

// EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Database Init
const DatabaseService = require("../sources/services/dbService");
const dbService = new DatabaseService();
dbService.loadTemplate();

// Express
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Passport
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

// Express Routers
const mainRouter = require('./routes/mainRouter');
app.use('/', mainRouter);
app.use(express.static(path.join(__dirname, 'public')));

// Express Server Start
app.listen(config.get('Server.port'));
require('./onAppStart')();
