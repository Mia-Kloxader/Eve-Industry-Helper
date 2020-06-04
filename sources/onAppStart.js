/**
 * Eve Industry Manager 2020
 *
 * Created by Mia Kloxader on 23/05/20
 */

const log = require("./logger").createLogger({
    level: 'info',
    context: 'on-start'
});

const config = require('config');

module.exports = function onStart() {
    log.info("Initializing Eve Industry Helper ...");
    log.info("Running version " + config.get('Version') + " in " + config.get('Env') + " mode.");
    log.info("Database Name : " + config.get('Database.filename'));
    log.info("Server started on http://" + config.get('Server.host') + ":" + config.get('Server.port'));
}

