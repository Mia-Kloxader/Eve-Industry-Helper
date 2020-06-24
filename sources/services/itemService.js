/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 22/06/20
 */

const config = require('config');
const fs = require('fs');
const path = require('path');

class itemService {
    constructor() {
        let typeIDJSON = fs.readFileSync(path.join(__dirname, '..', '..', config.get('ResourcesDir'), config.get('Files.ItemInfo')));

        this.typeIDInfo = JSON.parse(typeIDJSON.toString());
    }

    getItemById(typeID) {
        return new Promise((resolve, reject) => {
            if (this.typeIDInfo.hasOwnProperty(typeID))
                resolve(this.typeIDInfo[typeID]);
            else
                reject('Item not Found.');
        });
    }

    getItemsByIds(typeIDs) {
        return new Promise((resolve, reject) => {
            if (Array.isArray(typeIDs)) {
                let result = [];
                for (let i = 0; i < typeIDs.length; i++) {
                    if (this.typeIDInfo.hasOwnProperty(typeIDs[i]))
                        result.push(this.typeIDInfo[typeIDs[i]]);
                    else {
                        reject('Item not Found.');
                        return ;
                    }
                }
                resolve(result);
            } else
                reject('Parameter should be an array.');
        });
    }
}

module.exports = new itemService();
