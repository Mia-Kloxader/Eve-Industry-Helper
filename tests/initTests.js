/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 23/05/20
 */

global.config = require('config');
global.chai = require('chai');


chai.use(require('chai-as-promised')); // eslint-disable-line no-undef
chai.should(); // eslint-disable-line no-undef

const DatabaseService = require("../sources/services/dbService");
const dbService = new DatabaseService(); // eslint-disable-line no-unused-vars

before(async () => {
});

beforeEach(async () => {
})

after(async () => {
});

afterEach( async () => {
})
