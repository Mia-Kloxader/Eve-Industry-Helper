/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 23/05/20
 */

/**
 * How to use :
 *
 * const DatabaseService = require("../../sources/services/dbService");
 * const dbService = new DatabaseService();
 */

const config = require('config');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const log = require("../../sources/logger").createLogger({
    level: 'info',
    context: 'db-service'
});

module.exports = class dbService {
    constructor() {
        this._db = new sqlite3.Database(config.get('Database.filename'));
    }

    close() {
        return new Promise((resolve, reject) => {
            this._db.close(err => {
                if (err)
                    reject(err);
                else {
                    this._db = undefined;
                    resolve(true);
                }
            })
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            // Test Database is memory based and cannot be deleted
            if (config.get('Env') === 'test') {
                log.info("Database in memory mode, cannot delete.");
                resolve(true);
            } else
                fs.unlink(config.get('Database.filename'), function(err) {
                    if (err) {
                        log.error("Failed to delete Database.");
                        reject("Failed to delete database.");
                    } else {
                        log.error("Database deleted.");
                        resolve(true);
                    }
                })
        });
    }

    runQuery(query, parameters)
    {
        if (parameters === undefined)
            parameters = [];

        return new Promise((resolve, reject) => {
            this._db.serialize(() => {
                this._db.all(query, parameters, (err, rows) => {
                    if (err)
                        reject(err);
                    else
                        resolve(rows);
                });
            });
        });
    }

    loadTemplate() {
        return new Promise((resolve, reject) => {
            const dbTemplate = require('../../resources/dbTemplate');

            const promises = [];

            for (let i = 0; i < dbTemplate.tables.length; i++) {
                let table = dbTemplate.tables[i];
                let query = "CREATE TABLE IF NOT EXISTS " + table.table_name + " (";
                for (let j = 0; j < table.table_column.length; j++) {
                    let column = table.table_column[j];

                    if (j === 0)
                        query += column;
                    else
                        query += ", " + column;
                }
                query += ");";
                promises.push(this.runQuery(query));
            }

            Promise.all(promises)
                .then(() => {
                    resolve(true);
                })
                .catch(err => {
                    log.error("Failed to run Query -> " + err);
                    reject(err);
                });
        });
    }
}
