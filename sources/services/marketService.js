/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 24/06/20
 */

const request = require('request');

const itemPrice = require('../models/itemPrice');

const log = require("../../sources/logger").createLogger({
    level: 'info',
    context: 'market-service'
});

class marketService {
    getItemPrice(typeID, systemID) {
        log.info('Fetching item ' + typeID + ' price.');
        return new Promise((resolve, reject) => {
            if (systemID === undefined) {
                reject('SystemID must be provided.');
                return;
            }
            const url = 'http://api.evemarketer.com/ec/marketstat/json?&usesystem=' + systemID + '&typeid=' + typeID;

            request(url,(error, response, body) => {
                if (error)
                    reject(error);
                if (response.statusCode === 200)
                    resolve(new itemPrice(JSON.parse(body)[0]));
                else
                    reject(JSON.parse(body));
            });
        });
    }

    getItemsPrice(typeIDs, systemID) {
        log.info('fetching item ' + typeIDs + ' price.');
        return new Promise((resolve, reject) => {
            if (systemID === undefined) {
                reject('SystemID must be provided.');
                return;
            }
            if (Array.isArray(typeIDs)) {
                let url = 'http://api.evemarketer.com/ec/marketstat/json?&usesystem=' + systemID + '&typeid=';

                for (let i = 0; i < typeIDs.length; i++) {
                    if (i === 0)
                        url += typeIDs[i];
                    else
                        url += ',' + typeIDs[i];
                }

                request(url,(error, response, body) => {
                    if (error)
                        reject(error);
                    if (response.statusCode === 200) {
                        const parsed = JSON.parse(body);
                        let result = [];
                        for (let idx = 0; idx < parsed.length; idx++) {
                            result.push(new itemPrice(parsed[idx]));
                        }
                        resolve(result);
                    }
                    else
                        reject(JSON.parse(body));
                });
            }
        });
    }
}

module.exports = new marketService();
