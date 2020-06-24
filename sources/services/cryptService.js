/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 03/06/20
 */

const crypto = require('crypto');

const log = require("../../sources/logger").createLogger({
    level: 'info',
    context: 'crypt-service'
});

class cryptService {
    createHash(text, salt) {
        return new Promise((resolve, reject) => {
            try {
                let hash = crypto.createHmac('sha512', salt);
                hash.update(text);
                resolve(hash.digest('hex'));
            } catch(err) {
                log.error("Failed to create hash key.");
                reject(err);
            }
        });
    }

    generateSalt() {
        return new Promise((resolve) => {
            const saltLength = 16;
            resolve(crypto.randomBytes(Math.ceil(saltLength / 2))
                .toString('hex')
                .slice(0, saltLength));
        });
    }

    validatePassword(password, hash, salt) {
        return new Promise((resolve, reject) => {
            this.createHash(password, salt)
                .then(res => {
                    if (res === hash)
                        resolve(true);
                    else
                        reject("Invalid Password.");
                })
                .catch(err => {
                    reject(err);
                })
        });
    }
}

module.exports = new cryptService();
