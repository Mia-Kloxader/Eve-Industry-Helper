/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 03/06/20
 */

const cryptService = require("../../sources/services/cryptService");

describe('cryptService basics', () => {
    it('cryptService.generateSalt() success', () => {
        return cryptService.generateSalt()
            .should.be.fulfilled;
    });

    it('cryptService.createHash() success', () => {
        const toHash = "Password";

        return cryptService.generateSalt()
            .then(res => {
                return cryptService.createHash(toHash, res)
            })
            .should.be.fulfilled;
    });

    it('cryptService.validatePassword() success', () => {
        const toHash = "Password";
        let salt = undefined;

        return cryptService.generateSalt()
            .then(res => {
                salt = res;
                return cryptService.createHash(toHash, res)
            })
            .then(res => {
                return cryptService.validatePassword(toHash, res, salt);
            })
            .should.eventually.deep.equal(true);
    });

    it('cryptService.validatePassword() invalid password', () => {
        const toHash = "Password";
        const invalidPassword = "InvalidPassword";
        let salt = undefined;

        return cryptService.generateSalt()
            .then(res => {
                salt = res;
                return cryptService.createHash(toHash, res)
            })
            .then(res => {
                return cryptService.validatePassword(invalidPassword, res, salt);
            })
            .should.be.rejectedWith("Invalid Password.");
    });
});
