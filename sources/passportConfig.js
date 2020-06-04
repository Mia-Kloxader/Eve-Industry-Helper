/**
 * Eve Industry Helper 2020
 *
 * Created by Mia Kloxader on 04/06/20
 */

const LocalStrategy   = require('passport-local').Strategy;

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        return done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        if (id === 1)
            return done(null, {id: 1, username: "Test", password: "Password"});
        else
            return done("User not found.");
    });

    passport.use('signup', new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {

            // Add user to db if not exist
            // send same user as login

        }));

    passport.use('login', new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            if (username === "Test" && password === "Password")
                return done(null, {id: 1, username: "Test", password: "Password"});
            else
                return done(null, false);
        }));
};
