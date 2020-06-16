/**
 * Eve Industry Helper 2020
 *
 * Created by Mia Kloxader on 04/06/20
 */

const passport = require('passport');

module.exports = function(router) {
    router.get('/',
        function(req, res) {
            res.render('home', { user: req.user });
        });

    router.get('/login',
        function(req, res){
            res.render('login');
        });

    router.post('/login',
        passport.authenticate('login', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
        });

    router.get('/signup',
        function(req, res){
            res.render('signup');
        });

    router.post('/signup',
        passport.authenticate('signup', { failureRedirect: '/signup' }),
        function(req, res) {
            res.redirect('/');
        });

    router.get('/logout',
        function(req, res){
            req.logout();
            res.redirect('/');
        });

    router.get('/profile',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res){
            res.render('profile', { user: req.user });
        });
};
