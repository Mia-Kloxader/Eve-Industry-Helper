/**
 * Eve Industry Helper 2020
 *
 * Created by Mia Kloxader on 18/06/20
 */

const log = require("../../sources/logger").createLogger({
    level: 'info',
    context: 'industry-router'
});

const blueprintService = require('../services/blueprintService');

module.exports = function(router) {
    router.get('/industry/blueprintsearch',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res){
            blueprintService.getBlueprintList()
                .then(blueprintList => {
                    // If user has researched a specific blueprint
                    if (req.query.blueprint_name !== undefined) {
                        blueprintService.getBlueprintByName(req.query.blueprint_name)
                            .then(bp_info => {
                                return blueprintService.getBlueprintFullInfoById(bp_info.blueprintTypeID, 30000142);
                            })
                            .then(bp_info => {
                                res.render('blueprintsearch', { user: req.user, blueprintlist: blueprintList, blueprintinfo: bp_info });
                            })
                            .catch(err => {
                                log.error('Failed to bpInfo: ' + err);
                                res.render('/', { user: req.user });
                            });
                    }
                    else
                        res.render('blueprintsearch', { user: req.user, blueprintlist: blueprintList, blueprintinfo: undefined });
                })
                .catch(err => {
                    log.error('Failed to fetch bpList: ' + err);
                    res.render('/', { user: req.user });
                })
        });
};
