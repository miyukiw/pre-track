'use strict';

var _ = require('lodash');
var async = require('async');
var http = require('http');
var fs = require('fs');
var config = require('../config/environment');

var _DIR = config.root + '/data/';

exports.getTrackList = function(req, res) {
  async.waterfall([
    function(callback) {
      fs.readdir(_DIR, function(err, files){
        //console.log(files)
        callback(err, files)
      })
    },
    function(files, callback) {
      var pathList = files;
      var asyncFuncList = [];

      pathList.forEach(function(path) {
        if (path.indexOf('.json') > 0) {
          asyncFuncList.push(function(callback){
            fs.readFile(_DIR + path, function (err, data) {
              var trackData = JSON.parse(data);
              trackData.id = path.split('.')[0];//get id from filename 
              callback(err, trackData);
            });
          })
        }
      });
      async.parallel(asyncFuncList, function(err, results) {
        if (err) { 
          throw err;
        }
        console.log('all done');
        callback(err, files, results);
        
      });

    }
  ], function(err, files, results) {
    if (err) {
      throw err;
    }
    res.status(200).send(results);
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

exports.deleteTrack = function(req, res) {
  var trackId = req.param('id');
  var path = _DIR + trackId + '.json';

  if (trackId.indexOf('sample') > -1) {
    res.status(200).send();
    return;
  }

  fs.unlink(path, function (err) {
    if (err) {
      //throw err;
      res.status(400).send(err.code);
    }
    console.log(trackId + ' deleted!');
    res.status(200).send();
  });

};
