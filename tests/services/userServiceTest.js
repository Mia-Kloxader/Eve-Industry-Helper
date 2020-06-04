/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 03/06/20
 */

const log = require("../../sources/logger").createLogger({
    level: 'info',
    context: 'user-service-test'
});

const userService = require('./../../sources/services/userService');
const DatabaseService = require("../../sources/services/dbService");
const dbService = new DatabaseService();

describe('userService basic tests', () => {

    before(async () => {
        await dbService.loadTemplate();
    });

    beforeEach(async () => {
        await dbService.runQuery("DELETE FROM users;");
    })

    after(async () => {
        await dbService.delete();
    });

    it('userService.getUserById() success', () => {
        let expected = {
            username: "TestName",
            password: "TestPassword",
            salt: "0123456789ABCDEF"
        }

        return dbService.runQuery("INSERT INTO users (username, password, salt) VALUES (?, ?, ?);",
            [expected.username, expected.password, expected.salt])
            .then(() => {
                return dbService.runQuery("SELECT * FROM users;", []);
            })
            .then(rows => {
                expected.id = rows[0].id;
                return userService.getUserById(rows[0].id)
                    .should.eventually.deep.equal(expected);
            });
    });

    it('userService.getUserByUsername() success', () => {
        let expected = {
            username: "TestName",
            password: "TestPassword",
            salt: "0123456789ABCDEF"
        }

        return dbService.runQuery("INSERT INTO users (username, password, salt) VALUES (?, ?, ?);",
            [expected.username, expected.password, expected.salt])
            .then(() => {
                return dbService.runQuery("SELECT * FROM users;", []);
            })
            .then(rows => {
                expected.id = rows[0].id;
                return userService.getUserByUsername(rows[0].username)
                    .should.eventually.deep.equal(expected);
            });
    });

    // it('userService.registerUser() success', () => {
    //     return userService.registerUser()
    //         .should.be.fulfilled;
    // });
    //
    // it('userService.validateCredentials() success', () => {
    //     return userService.validateCredentials()
    //         .should.be.fulfilled;
    // });

});
