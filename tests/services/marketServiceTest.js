/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 24/06/20
 */

const marketService = require('../../sources/services/marketService');

describe('marketService unit tests', () => {

    it('marketService.getItemPrice() success', () => {
        let promise = marketService.getItemPrice(34, 30000142);

        return Promise.all([
            promise.should.be.fulfilled,
            promise.should.eventually.be.an('object'),
            promise.should.eventually.have.property('typeID', 34),
            promise.should.eventually.have.property('region', 10000002),
            promise.should.eventually.have.property('system', 30000142),
            promise.should.eventually.have.property('buy'),
            promise.should.eventually.have.property('sell')
        ]);
    }).timeout(10000);

    it('marketService.getItemsPrice() success', () => {
        let promise = marketService.getItemsPrice([34, 35], 30000142);

        return Promise.all([
            promise.should.be.fulfilled,
            promise.should.eventually.be.an('array')
        ]);
    }).timeout(10000);
});
