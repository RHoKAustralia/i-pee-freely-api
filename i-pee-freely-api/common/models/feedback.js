var json2csv = require('json2csv');

module.exports = function(Feedback) {
/*
var json2csv = require('json2csv');
var fields = ['field1', 'field2', 'field3'];

json2csv({ data: myData, fields: fields }, function(err, csv) {
  if (err) console.log(err);
  console.log(csv);
});*/

    Feedback.csvexport = function(res, callback) {
        Feedback.find(function(err, myData) {
            if(err) {
                return callback(err);
            }

            //@todo: get your data from database etc...
            var datetime = new Date();
            res.set('Expires', 'Tue, 03 Jul 2001 06:00:00 GMT');
            res.set('Cache-Control', 'max-age=0, no-cache, must-revalidate, proxy-revalidate');
            res.set('Last-Modified', datetime +'GMT');
            res.set('Content-Type','application/force-download');
            res.set('Content-Type','application/octet-stream');
            res.set('Content-Type','application/download');
            res.set('Content-Disposition','attachment;filename=Data.csv');
            res.set('Content-Transfer-Encoding','binary');

            var fields = [
                "dateTime",
                "comments",
                "userAgent",
                "trackingId",
                "accessibility",
                "cleanliness",
                "overallRating",
                "locationRef",
                "id"];


            json2csv({ data: myData, fields: fields }, function(err, csv) {
                if(err) {
                 return callback(err);
                }

                res.send(csv);
            });
        });
    };

    Feedback.remoteMethod('csvexport',
    {
      accepts: [
        {arg: 'res', type: 'object', 'http': {source: 'res'}}
      ],
      returns: {},
      http: {path: '/csvexport', verb: 'get'}
    });



};



