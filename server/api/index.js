'use strict';

var express = require('express');
var controller = require('./track.controller');

var router = express.Router();

router.get('/track', controller.getTrack);
router.post('/track', controller.updateTrack);
module.exports = router;
