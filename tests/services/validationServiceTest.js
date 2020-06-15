/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 15/06/20
 */

const log = require("../../sources/logger").createLogger({
    level: 'info',
    context: 'validation-service-test'
});

const valService = require('../../sources/services/validationService');

describe('validationService unit tests', () => {

    it('validationService.validatePassword() success', () => {
        return valService.validatePassword('(<LN,6mF<nM}DKbH')
            .should.be.fulfilled;
    });

    it('validationService.validatePassword() too many char', () => {
        return valService.validatePassword('VD*ks49z3W_u=-SqVD*ks49z3W_u=-SqVD*ks49z3W_u=-SqVD*')
            .should.be.rejectedWith(valService.Errors.Password.tooManyChar);
    });

    it('validationService.validatePassword() too little char', () => {
        return valService.validatePassword('VD*ks49')
            .should.be.rejectedWith(valService.Errors.Password.tooLittleChar);
    });

    it('validationService.validatePassword() no number', () => {
        return valService.validatePassword('VD*ksgdgd')
            .should.be.rejectedWith(valService.Errors.Generic.noNumber);
    });

    it('validationService.validatePassword() no upper case', () => {
        return valService.validatePassword('vb*k2sgdgd')
            .should.be.rejectedWith(valService.Errors.Generic.noUpperCase);
    });

    it('validationService.validatePassword() no lower case', () => {
        return valService.validatePassword('VD*D2JHEBHF')
            .should.be.rejectedWith(valService.Errors.Generic.noLowerCase);
    });

    it('validationService.validateUsername() success', () => {
        return valService.validateUsername('Mia Kloxader')
            .should.be.fulfilled;
    });

    it('validationService.validateUsername() too little char', () => {
        return valService.validateUsername('Mia')
            .should.be.rejectedWith(valService.Errors.Username.tooLittleChar);
    });

    it('validationService.validateUsername() too many char', () => {
        return valService.validateUsername('VD*ks49z3W_u=-SqVD*ks49z3W_u=-S')
            .should.be.rejectedWith(valService.Errors.Username.tooManyChar);
    });

});
