/**
 * Eve Industry Helper 2020
 *
 * Created by Mia Kloxader on 04/06/20
 */

const log = require("../sources/logger").createLogger({
    level: 'info',
    context: 'passport-config'
});

const LocalStrategy   = require('passport-local').Strategy;

const credentialsModel = require("../sources/models/credentials");
const userService = require("../sources/services/userService");

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        return done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        userService.getUserById(id)
            .then(user => {
                return done(null, {
                    id: user.id,
                    username: user.username
                });
            })
            .catch(err => {
                log.error("User not found when deserializing: " + err);
                return done("User not found.");
            });
    });

    passport.use('signup', new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            userService.registerUser(username, password)
                .then(user => {
                    return done(null, {id: user.id, username: user.username});
                })
                .catch(err => {
                    log.error("Failed to register User: " + err);
                    return done(null, false);
                });
        }));

    passport.use('login', new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            userService.validateCredentials(new credentialsModel(username, password))
                .then(user => {
                    return done(null, {id: user.id, username: user.username});
                })
                .catch(err => {
                    log.error("Failed to log in user: " + err);
                    return done(null, false);
                });
        }));
};
