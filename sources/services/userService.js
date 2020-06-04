/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 03/06/20
 */

const config = require('config');

const log = require("../../sources/logger").createLogger({
    level: 'info',
    context: 'user-service'
});

const DatabaseService = require("../../sources/services/dbService");
const dbService = new DatabaseService();

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

    registerUser(user) {
        return new Promise((resolve, reject) => {
        });
    }

    validateCredentials(credentials) {
        return new Promise((resolve, reject) => {
        });
    }
}

module.exports = new userService();
