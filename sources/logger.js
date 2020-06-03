/**
 * Eve Industry Helper 2020
 *
 * Created by Mia Kloxader on 02/06/20
 */

/**
 * How to use :
 *
 * const log = require("./sources/logger").createLogger({
 *  level: 'info',
 *  context: 'context-name'
 * });
 * log.info("Test Info");
 * log.error("Test Error");
 */

const winston = require('winston');

class logger {
    createLogger(loggerConfig) {
        const logger = winston.createLogger({
            level: loggerConfig.level,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            defaultMeta: { context: loggerConfig.context },
            transports: [
                new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
                new winston.transports.File({ filename: 'logs/combined.log' }),
            ],
        });

        if (process.env.NODE_ENV === 'development') {
            logger.add(new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.simple()
                )
            }));
        }
        return logger;
    }
}

module.exports = new logger;
