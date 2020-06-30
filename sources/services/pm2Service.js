/**
 * Eve Industry Helper 2020
 *
 * Created by Mia Kloxader on 30/06/20
 */

const config = require('config');

let reqsec = undefined;
if (config.get('PM2') === true) {
    const io = module.require('@pm2/io');

    reqsec = io.meter({
        name: 'req/sec',
        id: 'app/requests/volume'
    })
}

module.exports = (req, res, next) => {
    if (config.get('PM2') === true)
        reqsec.mark();
    next();
};
