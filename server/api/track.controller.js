'use strict';

var _ = require('lodash');
var http = require('http');
var fs = require('fs');
var config = require('../config/environment');

exports.createTrack = function(req, res) {
  var post_data = req.body;

  res.json(post_data);
};

var _FILE = (config.root + '/sample.json');
console.log(_FILE)

// get transaction records
exports.getTrack = function(req, res) {
  var trackId = req.param('id');
  //console.log(trackId);
  fs.readFile(_FILE, function (err, data) {
    if (err) throw err;
    res.status(200).send(JSON.parse(data));
  });
};

// get transaction records
exports.updateTrack = function(req, res) {
  var data = req.body;
  console.log(data);

  fs.writeFile(_FILE, JSON.stringify(data), function (err) {
    if (err) throw err;
    console.log('updated!');
    res.status(200).send();
  });
};

