/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 18/06/20
 */

const log = require("../../sources/logger").createLogger({
    level: 'info',
    context: 'blueprint-service-test'
});

const blueprintService = require('../../sources/services/blueprintService');

describe('blueprintService unit tests', () => {

    it('blueprintService.getBlueprintList() success', () => {
        return blueprintService.getBlueprintList()
            .should.eventually.be.a('array');
    });

    it('blueprintService.getBlueprintByTypeid(2769) Success', () => {
        return blueprintService.getBlueprintByTypeid(2769)
            .should.be.fulfilled;
    });

    it('blueprintService.getBlueprintByTypeid(34) Not Found', () => {
        return blueprintService.getBlueprintByTypeid(34)
            .should.be.rejectedWith('Blueprint not found.');
    });

    it('blueprintService.getBlueprintTypeId() Success', () => {
        return blueprintService.getBlueprintList()
            .then(res => {
                return blueprintService.getBlueprintTypeId(res[43][1])
                    .should.be.fulfilled;
            });
    });

    it('blueprintService.getBlueprintTypeId() Not Found', () => {
        return blueprintService.getBlueprintTypeId('InvalidName')
            .should.be.rejectedWith('Blueprint not found.');
    });

    it('blueprintService.getBlueprintByName() Success', () => {
        return blueprintService.getBlueprintList()
            .then(res => {
                return blueprintService.getBlueprintByName(res[43][1])
                    .should.be.fulfilled;
            });
    });

    it('blueprintService.getBlueprintByName() Not Found', () => {
        return blueprintService.getBlueprintByName('InvalidName')
            .should.be.rejectedWith('Blueprint not found.');
    });
});
