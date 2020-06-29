/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 18/06/20
 */

const config = require('config');
const fs = require('fs');
const path = require('path');

const marketService = require('./marketService');
const itemService = require('./itemService');

const log = require("../../sources/logger").createLogger({
    level: 'info',
    context: 'blueprint-service'
});

class blueprintService {
    constructor() {
        let fsBpList = fs.readFileSync(path.join(__dirname, '..', '..', config.get('ResourcesDir'), config.get('Files.BlueprintList')));
        let fsBpInfo = fs.readFileSync(path.join(__dirname, '..', '..', config.get('ResourcesDir'), config.get('Files.BlueprintInfo')));

        this.blueprintList = JSON.parse(fsBpList.toString());
        this.blueprintInfo = JSON.parse(fsBpInfo.toString());
    }

    getBlueprintList() {
        return new Promise((resolve) => {
            resolve(this.blueprintList);
        });
    }

    getBlueprintByTypeid(typeid) {
        return new Promise((resolve, reject) => {
            if (this.blueprintInfo.hasOwnProperty(typeid))
                resolve(this.blueprintInfo[typeid]);
            else {
                log.error("Failed to fetch blueprint: " + typeid);
                reject('Blueprint not found.');
            }
        });
    }

    getBlueprintTypeId(blueprintName) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < this.blueprintList.length; i++) {
                if (this.blueprintList[i][1] === blueprintName) {
                    resolve(this.blueprintList[i][0]);
                    return ;
                }
            }
            log.error("Failed to fetch blueprint: " + blueprintName);
            reject('Blueprint not found.');
        });
    }

    getBlueprintByName(blueprintName) {
        return new Promise((resolve, reject) => {
            this.getBlueprintTypeId(blueprintName)
                .then(id => {
                    return this.getBlueprintByTypeid(id);
                })
                .then(info => {
                    resolve(info);
                })
                .catch(err => {
                    log.error("Failed to fetch blueprint: " + blueprintName);
                    reject(err);
                });
        });
    }

    getBlueprintFullInfoById(typeID, systemId) {
        return new Promise((resolve, reject) => {
            let fullInfo = undefined;

            let allItems = [];
            this.getBlueprintByTypeid(typeID)
                .then(res => {
                    fullInfo = res;
                    let idx = 0;
                    for (idx = 0; idx < res.activities.manufacturing.materials.length; idx++) {
                        allItems.push(res.activities.manufacturing.materials[idx].typeID);
                    }
                    for (idx = 0; idx < res.activities.manufacturing.products.length; idx++) {
                        allItems.push(res.activities.manufacturing.products[idx].typeID);
                    }

                    return marketService.getItemsPrice(Array.from(new Set(allItems)), systemId)
                })
                .then(res => {
                    fullInfo.itemPrices = res;
                    return itemService.getItemsByIds(allItems);
                })
                .then(res => {
                    fullInfo.itemInfo = res;
                    resolve(fullInfo);
                })
                .catch(err => {
                    log.error("Failed to fetch blueprint: " + typeID);
                    reject(err);
                });
        });
    }
}

module.exports = new blueprintService();
