/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 18/06/20
 */

const blueprintService = require('../../sources/services/blueprintService');

describe('blueprintService unit tests', () => {

    it('blueprintService.getBlueprintList() success', () => {
        let promise = blueprintService.getBlueprintList();

        return Promise.all([
            promise.should.be.fulfilled,
            promise.should.not.be.rejected,
            promise.should.eventually.be.an('array')
        ]);
    });

    it('blueprintService.getBlueprintByTypeid() Success', () => {
        let promise = blueprintService.getBlueprintByTypeid(2769);

        return Promise.all([
            promise.should.be.fulfilled,
            promise.should.not.be.rejected,
            promise.should.eventually.be.an('object'),
            promise.should.eventually.have.property('activities').and.be.an('object'),
            promise.should.eventually.have.property('blueprintTypeID').and.be.a('number'),
            promise.should.eventually.have.property('maxProductionLimit').and.be.a('number'),
            promise.should.eventually.have.property('name').and.be.a('string'),
            promise.should.eventually.have.property('volume').and.be.a('number'),
            promise.should.eventually.have.property('groupID').and.be.a('number'),
            promise.should.eventually.have.property('basePrice').and.be.a('number')
        ]);
    });

    it('blueprintService.getBlueprintByTypeid() Not Found', () => {
        let promise = blueprintService.getBlueprintByTypeid(34);

        return Promise.all([
            promise.should.be.rejected,
            promise.should.be.rejectedWith('Blueprint not found.'),
            promise.should.not.be.fulfilled
        ]);
    });

    it('blueprintService.getBlueprintTypeId() Success', () => {
        blueprintService.getBlueprintList()
            .then(res => {
                let promise = blueprintService.getBlueprintTypeId(res[43][1]);

                return Promise.all([
                    promise.should.be.fulfilled,
                    promise.should.not.be.rejected,
                    promise.should.eventually.be.a('number')
                ]);
            });
    });

    it('blueprintService.getBlueprintTypeId() Not Found', () => {
        let promise = blueprintService.getBlueprintTypeId('InvalidName');

        return Promise.all([
            promise.should.be.rejected,
            promise.should.be.rejectedWith('Blueprint not found.'),
            promise.should.not.be.fulfilled
        ]);
    });

    it('blueprintService.getBlueprintByName() Success', () => {
        blueprintService.getBlueprintList()
            .then(res => {
                let promise = blueprintService.getBlueprintByName(res[43][1]);

                return Promise.all([
                    promise.should.be.fulfilled,
                    promise.should.not.be.rejected,
                    promise.should.eventually.be.an('object'),
                    promise.should.eventually.have.property('activities').and.be.an('object'),
                    promise.should.eventually.have.property('blueprintTypeID').and.be.a('number'),
                    promise.should.eventually.have.property('maxProductionLimit').and.be.a('number'),
                    promise.should.eventually.have.property('name').and.be.a('string'),
                    promise.should.eventually.have.property('volume').and.be.a('number'),
                    promise.should.eventually.have.property('groupID').and.be.a('number'),
                    promise.should.eventually.have.property('basePrice').and.be.a('number')
                ]);
            });
    });

    it('blueprintService.getBlueprintByName() Not Found', () => {
        let promise = blueprintService.getBlueprintByName('InvalidName');

        return Promise.all([
            promise.should.be.rejected,
            promise.should.be.rejectedWith('Blueprint not found.'),
            promise.should.not.be.fulfilled
        ]);
    });
});
