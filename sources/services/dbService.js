/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 23/05/20
 */

const config = require('config');
const sqlite = require('sqlite-async');
const fs = require('fs');

const log = require("../../sources/logger").createLogger({
    level: 'info',
    context: 'db-service'
});

class dbService {
    constructor() {
        this._db = undefined;
    }

    create() {
        return new Promise((resolve, reject) => {
            sqlite.open(config.get('Database.filename'))
                .then(db => {
                    this._db = db;
                    log.info("Created database in : " + config.get('Database.filename'));
                    resolve(true);
                })
                .catch(err => {
                    log.error("Failed to create database in : " + config.get('Database.filename'));
                    reject(err);
                });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            if (this._db !== undefined)
                this._db.close()
                    .then(() => {
                        this._db = undefined;
                        resolve(true);
                    })
                    .catch(err => {
                        reject(err);
                    })
            else
                reject("Database not opened.");
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

    loadTemplate() {
        return new Promise(async (resolve, reject) => {
            const dbTemplate = require('../../ressources/dbTemplate');

            for (let table of dbTemplate.tables) {
                let query = "CREATE TABLE IF NOT EXISTS " + table.table_name + " (";
                let first = true;
                for (let column of table.table_column) {
                    if (first) {
                        first = false;
                        query += column;
                    }
                    else
                        query += ", " + column;
                }
                query += ");";
                await this.runQuery(query)
                    .catch(err => {
                        log.error(err);
                        reject(err);
                    });
            }
            resolve(true);
        });
    }

    runQuery(query, parameters) {
        if (parameters === undefined)
            parameters = [];

        return new Promise(async (resolve, reject) => {
            this._db.run(query, parameters)
                .then(res => {
                    log.info("Success on SQL Query -> " + query);
                    resolve(res);
                })
                .catch(err => {
                    log.error("Error on Query -> " + query);
                    reject(err);
                });
        });
    }
}

module.exports = new dbService();
