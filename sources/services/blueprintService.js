/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 18/06/20
 */

const config = require('config');
const fs = require('fs');
const path = require('path');

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
        return new Promise((resolve, reject) => {
            resolve(this.blueprintList);
        });
    }

    getBlueprintByTypeid(typeid) {
        return new Promise((resolve, reject) => {
            if (this.blueprintInfo.hasOwnProperty(typeid))
                resolve(this.blueprintInfo[typeid]);
            else
                reject('Blueprint not found.');
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
                    reject(err);
                });
        });
    }
}

module.exports = new blueprintService();
