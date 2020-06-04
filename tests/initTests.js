/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 23/05/20
 */

global.config = require('config');
global.chai = require('chai');

chai.use(require('chai-as-promised'));
chai.should();

const DatabaseService = require("../sources/services/dbService");
const dbService = new DatabaseService();

before(async () => {
});

beforeEach(async () => {
})

after(async () => {
});

afterEach( async () => {
})
