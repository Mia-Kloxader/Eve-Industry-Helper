/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 03/06/20
 */

class user {
    constructor(username, password, id, salt) {
        this.username = username;
        this.password = password;
        this.id = id;
        this.salt = salt;
    }
}

module.exports = user;

