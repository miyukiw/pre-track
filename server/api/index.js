'use strict';

var express = require('express');
var controller = require('./track.controller');

var router = express.Router();

router.get('/tracks', controller.getTrackList);
router.get('/track/:id', controller.getTrack);
router.post('/create-track', controller.createTrack);
router.post('/track/:id', controller.updateTrack);
module.exports = router;
