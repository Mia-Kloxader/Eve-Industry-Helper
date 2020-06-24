/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 03/06/20
 */

const credentials = require("../../sources/models/credentials");

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

    it('userService.registerUser() success', () => {
        return new Promise((resolve, reject) => {
            return userService.registerUser('testUsername', 'testPassword')
                .then(user => {
                    return dbService.runQuery("SELECT * FROM users WHERE id = ?;",
                        [user.id]);
                })
                .then(rows => {
                    if (rows.length > 0)
                        resolve(true);
                    else
                        reject(false);
                });
        }).should.be.fulfilled;
    });

    it('userService.registerUser() already exist', () => {
        return userService.registerUser('testUsername', 'testPassword')
            .then(() => {
                return userService.registerUser('testUsername', 'testPassword')
                    .should.be.rejectedWith("Username already exist.");
            });
    });

    it('userService.validateCredentials() success', () => {
        return userService.registerUser('testUsername', 'testPassword')
            .then(() => {
                return userService.validateCredentials(
                    new credentials('testUsername', 'testPassword'))
                    .should.be.fulfilled;
            });
    });

    it('userService.validateCredentials() wrongPassword', () => {
        return userService.registerUser('testUsername', 'testPassword')
            .then(() => {
                return userService.validateCredentials(
                    new credentials('testUsername', 'wrongPassword'))
                    .should.be.rejectedWith("Invalid Password.");
            });
    });

    it('userService.validateCredentials() noUser', () => {
        return userService.registerUser('testUsername', 'testPassword')
            .then(() => {
                return userService.validateCredentials(
                    new credentials('wrongUsername', 'testPassword'))
                    .should.be.rejectedWith("User not found.");
            });
    });

});
