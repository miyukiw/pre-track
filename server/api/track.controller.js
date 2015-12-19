'use strict';

var _ = require('lodash');
var http = require('http');

exports.createTrack = function(req, res) {
  var post_data = req.body;

  res.json(post_data);
};

// get transaction records
exports.getTrack = function(req, res) {
  var trackId = req.param('id');

  console.log(trackId);

  var json = {
    items: [
      {
        type: 'place',
        name: '清澄白河駅',
        start: '10:02 am'
      },
      {
        type: 'transfer',
        name: '徒歩',
        time: '15分'
      },
      {
        type: 'place',
        name: '東京都現代美術館',
        start: '10:20 am',
        end: '11:30 am',
        image_urls: [
          'http://www.thecoffeebrothers.com/wp-content/uploads/2014/10/20141026021605_02.jpg',
          'http://image1-4.tabelog.k-img.com/restaurant/images/Rvw/44559/44559268.jpg'
        ]
      },
      {
        type: 'transfer',
        name: '徒歩',
        time: '10分'
      },
      {
        type: 'place',
        name: '深川日和',
        start: '10:43 am',
        end: '12:37 pm',
        image_urls: [
          'http://www.thecoffeebrothers.com/wp-content/uploads/2014/10/20141026021605_02.jpg',
          'http://image1-4.tabelog.k-img.com/restaurant/images/Rvw/44559/44559268.jpg',
          'http://image1-4.tabelog.k-img.com/restaurant/images/Rvw/44559/44559268.jpg'
        ]
      },
      {
        type: 'transfer',
        name: '徒歩',
        time: '5分'
      },
      {
        type: 'place',
        name: '深川江戸資料館',
        start: '12:45 pm',
        end: '13:33 pm'
      },
      {
        type: 'transfer',
        name: '徒歩',
        time: '10分'
      },
      {
        type: 'place',
        name: '江東区立深川図書館',
        start: '13:48 pm',
        end: '14:09 pm'
      },
      {
        type: 'transfer',
        name: '徒歩',
        time: '1分'
      },
      {
        type: 'place',
        name: 'アライズコーヒーエンタングル',
        start: '14:14 pm',
        end: '14:53 pm',
        image_urls: [
          'http://www.thecoffeebrothers.com/wp-content/uploads/2014/10/20141026021605_02.jpg',
          'http://image1-4.tabelog.k-img.com/restaurant/images/Rvw/44559/44559268.jpg',
          'http://www.thecoffeebrothers.com/wp-content/uploads/2014/10/20141026021605_02.jpg',
          'http://image1-4.tabelog.k-img.com/restaurant/images/Rvw/44559/44559268.jpg'
        ]
      },
      {
        type: 'transfer',
        name: '徒歩',
        time: '4分'
      },
      {
        type: 'place',
        name: '清澄庭園',
        start: '15:04 pm',
        end: '18:59 pm',
        comment: '最後の紅葉終わりかけの清澄庭園¥nのんびり散歩の締めくくり！'
      }
    ]
  }

  res.status(200).send(json);
};
