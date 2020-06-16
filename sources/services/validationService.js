/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 15/06/20
 */

const log = require("../../sources/logger").createLogger({
    level: 'info',
    context: 'validate-service'
});

const Errors = {
    Username: {
        tooManyChar: "Maximum number of character is 30.",
        tooLittleChar: "Minimum number of character is 6."
    },
    Password: {
        tooManyChar: "Maximum number of character is 50.",
        tooLittleChar: "Minimum number of character is 8."
    },
    Generic: {
        noNumber: "Should contain at least a number.",
        noLowerCase: "Should contain at least a lower case character.",
        noUpperCase: "Should contain at least an upper case character."
    }
}

class userService {
    constructor() {
        this.Errors = Errors;
    }

    validateUsername(str) {
        return new Promise((resolve, reject) => {
            if (str.length > 30)
                reject(this.Errors.Username.tooManyChar);
            else if (str.length < 6)
                reject(this.Errors.Username.tooLittleChar);
            else
                resolve(true);
        });
    }

    validatePassword(str) {
        return new Promise((resolve, reject) => {
            if (str.length > 50)
                reject(this.Errors.Password.tooManyChar);
            else if (str.length < 8)
                reject(this.Errors.Password.tooLittleChar);
            else if (str.search(/\d/) === -1)
                reject(this.Errors.Generic.noNumber);
            else if (str.search(/[a-z]/) === -1)
                reject(this.Errors.Generic.noLowerCase);
            else if (str.search(/[A-Z]/) === -1)
                reject(this.Errors.Generic.noUpperCase);
            else
                resolve(true);
        });
    }
}

module.exports = new userService();
