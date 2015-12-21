'use strict';

var _ = require('lodash');
var http = require('http');
var fs = require('fs');
var config = require('../config/environment');

exports.createTrack = function(req, res) {
  var post_data = req.body;

  res.json(post_data);
};

var _DIR = config.root + '/data/';

// get transaction records
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

// get transaction records
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
