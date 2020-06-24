/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 03/06/20
 */

const log = require("../../sources/logger").createLogger({
    level: 'info',
    context: 'user-service'
});

const DatabaseService = require("../../sources/services/dbService");
const dbService = new DatabaseService();
const cryptService = require("../services/cryptService");

const userModel = require("../models/user");

class userService {
    getUserById(id) {
        return new Promise((resolve, reject) => {
            dbService.runQuery("SELECT * FROM users WHERE id = ?;",
                [id])
                .then(res => {
                    if (res.length === 0)
                        reject("User not found.");
                    else {
                        resolve(new userModel(res[0].username,
                            res[0].password,
                            res[0].id,
                            res[0].salt));
                    }
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            dbService.runQuery("SELECT * FROM users WHERE username = ?;",
                [username])
                .then(res => {
                    if (res.length === 0)
                        reject("User not found.");
                    else {
                        resolve(new userModel(res[0].username,
                            res[0].password,
                            res[0].id,
                            res[0].salt));
                    }
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    registerUser(username, password) {
        return new Promise((resolve, reject) => {
            let newUser = {
                id: "",
                username: username,
                password: "",
                salt: ""
            };

            log.info("Registering user: " + username + " with password: " + password);
            dbService.runQuery("SELECT * FROM users WHERE username LIKE ?;",
                [newUser.username])
                .then(rows => {
                    if (rows.length > 0)
                        throw("Username already exist.");
                    else
                        return cryptService.generateSalt();
                })
                .then(salt => {
                    newUser.salt = salt;
                    return cryptService.createHash(password, salt);
                })
                .then(hash => {
                    newUser.password = hash;
                    return dbService.runQuery("INSERT INTO users (username, password, salt) VALUES (?, ?, ?)",
                        [newUser.username, newUser.password, newUser.salt]);
                })
                .then(() => {
                    return dbService.runQuery("SELECT id FROM users WHERE username = ?;",
                        [username])
                })
                .then(rows => {
                    if (rows.length < 0)
                        throw("Failed to add user.");
                    else {
                        newUser.id = rows[0].id;
                        log.info("Registered User " + JSON.stringify(newUser));
                        resolve(newUser);
                    }
                })
                .catch(err => {
                    log.error(err)
                    reject(err);
                })
        });
    }

    validateCredentials(credentials) {
        let user = {
          id: "",
          username: "",
          password: "",
          salt: ""
        };

        return new Promise((resolve, reject) => {
            dbService.runQuery("SELECT * FROM users WHERE username LIKE ?;",
                [credentials.username])
                .then(rows => {
                    if (rows.length === 0)
                        throw("User not found.");
                    else {
                        user.username = rows[0].username;
                        user.password = rows[0].password;
                        user.salt = rows[0].salt;
                        user.id = rows[0].id;
                        return cryptService.validatePassword(credentials.password, rows[0].password, rows[0].salt);
                    }
                })
                .then(res => {
                    if (res === true)
                        resolve(user);
                    else
                        throw("Failed to authenticate.");
                })
                .catch(err => {
                    log.error(err);
                    reject(err);
                })
        });
    }
}

module.exports = new userService();
