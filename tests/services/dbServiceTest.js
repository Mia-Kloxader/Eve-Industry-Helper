/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 23/05/20
 */

const log = require("../../sources/logger").createLogger({
    level: 'info',
    context: 'db-service-test'
});

const dbService = require('./../../sources/services/dbService');

describe('dbService initialization', () => {
    it('dbService.create() success', () => {
        return dbService.create()
            .should.be.fulfilled;
    });

    it('dbService.loadTemplate() success', () => {
        return dbService.loadTemplate()
            .should.be.fulfilled;
    });

    it('dbService.loadTemplate() success already loaded', () => {
        return dbService.loadTemplate()
            .should.be.fulfilled;
    });

    it('dbService.close() success', () => {
        return dbService.close()
            .should.be.fulfilled;
    });

    it('dbService.close() already closed failure', () => {
        return dbService.close()
            .should.be.rejected;
    });

    it('dbService.delete() success', () => {
        return dbService.delete()
            .should.be.fulfilled;
    });
});
