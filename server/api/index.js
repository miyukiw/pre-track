'use strict';

var express = require('express');
var controller = require('./track.controller');

var router = express.Router();

router.get('/track', controller.getTrack);
module.exports = router;
