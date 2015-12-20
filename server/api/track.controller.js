'use strict';

var _ = require('lodash');
var http = require('http');
var fs = require('fs');

exports.createTrack = function(req, res) {
  var post_data = req.body;

  res.json(post_data);
};

// get transaction records
exports.getTrack = function(req, res) {
  var trackId = req.param('id');
  //console.log(trackId);
  fs.readFile('sample.json', function (err, data) {
    if (err) throw err;
    res.status(200).send(JSON.parse(data));
  });
};

// get transaction records
exports.updateTrack = function(req, res) {
  var data = req.body;
  console.log(data);

  fs.writeFile('sample.json', JSON.stringify(data), function (err) {
    if (err) throw err;
    console.log('updated!');
    res.status(200).send();
  });
};
