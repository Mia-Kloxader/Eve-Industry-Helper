/**
 * Eve Industry Helper 2020
 *
 * Created by Mia Kloxader on 04/06/20
 */

const express = require('express');
let router = express.Router();

require('./authentication')(router);
require('./industry')(router);

module.exports = router;
