'use strict';

var _ = require('lodash');
var http = require('http');
var fs = require('fs');
var config = require('../config/environment');

var _DIR = config.root + '/data/';

exports.createTrack = function(req, res) {
  var data = req.body;
  var trackId = new Date().getTime();
  var path = _DIR + trackId + '.json';

  fs.writeFile(path, JSON.stringify(data), function (err) {
    if (err) {
      //throw err;
      res.status(400).send(err.code);
    }
    console.log('created!');
    res.status(201).json({id: trackId});
  });
};

exports.getTrack = function(req, res) {
  var trackId = req.param('id');
  var path = _DIR + trackId + '.json';
  fs.readFile(path, function (err, data) {
    if (err) {
      //throw err;
      res.status(404).send(err.code);
    } else {
      res.status(200).send(JSON.parse(data));
    }
  });
};

exports.updateTrack = function(req, res) {
  var data = req.body;
  var trackId = req.param('id');
  var path = _DIR + trackId + '.json';

  fs.writeFile(path, JSON.stringify(data), function (err) {
    if (err) {
      //throw err;
      res.status(400).send(err.code);
    }
    console.log('updated!');
    res.status(200).send();
  });
};
