/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 23/05/20
 */

global.config = require('config');
global.chai = require('chai');

chai.use(require('chai-as-promised'));
chai.should();

before(function() {
    require('../sources/onAppStart')();
});

after(function() {
});
