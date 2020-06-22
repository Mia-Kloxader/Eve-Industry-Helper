/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 22/06/20
 */

const log = require("../../sources/logger").createLogger({
    level: 'info',
    context: 'item-service-test'
});

const itemService = require('../../sources/services/itemService');

describe('itemService unit tests', () => {

    it('itemService.getItemById() success', () => {
        return itemService.getItemById(34)
            .should.be.fulfilled;
    });

    it('itemService.getItemById() Not Found', () => {
        return itemService.getItemById(1)
            .should.be.rejectedWith('Item not Found.');
    });

    it('itemService.getItemsByIds() success', () => {
        return itemService.getItemsByIds([238, 239])
            .should.eventually.be.a('array');
    });

    it('itemService.getItemsByIds() Not an Array', () => {
        return itemService.getItemsByIds(2)
            .should.be.rejectedWith('Parameter should be an array.');
    });

    it('itemService.getItemsByIds() Not Found', () => {
        return itemService.getItemsByIds([238, 1, 239])
            .should.be.rejectedWith('Item not Found.');
    });

});
