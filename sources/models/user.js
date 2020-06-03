/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 03/06/20
 */

class user {
    constructor(name, password, id, salt) {
        this.name = name;
        this.password = password;
        this.id = id;
        this.salt = salt;
    }
}

module.exports = user;

