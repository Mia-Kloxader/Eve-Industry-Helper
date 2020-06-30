/**
 * Eve Industry Helper 2020
 *
 * Created by Mia Kloxader on 04/06/20
 */

const express = require('express');
let router = express.Router();

require('./authentication')(router);
require('./industry')(router);

router.get('*', function(req, res){
    res.status('404').render('404', { user: req.user });
});

module.exports = router;
