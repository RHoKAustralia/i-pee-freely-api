var GeoPoint = require('loopback').GeoPoint;

module.exports = function(Location) {

    Location.sortOfHackyLocationQuery = function(lat, lng, max, next) {

        // TODO: This is a bit hacky and copy and pasted from https://github.com/strongloop/loopback-connector-mysql/issues/45
        // SQL injection attack anyone?

        var table = 'location';
        var column = 'locationLatLng';

        var sql = 'SELECT x.id from ( \
                    SELECT id, ( \
                          6373 * acos ( \
                          cos ( radians( ' + lat + ' ) ) \
                          * cos( radians( X(' + column + ') ) ) \
                          * cos( radians( Y(' + column + ') ) - radians( ' + lng + ' ) ) \
                          + sin ( radians( ' + lat + ' ) ) \
                          * sin( radians( X(' + column + ') ) ) \
                        ) \
                    ) AS distance \
                  FROM ' + table + ' \
                      ORDER BY distance \
                      ) x \
                  WHERE x.distance < ' + max + ';';

        Location.app.datasources['mySQL-Wordpress'].connector.query(sql, function(err, result) {
          if (err) {
            console.log('Error retrieving persons nearby ...');
            console.log(err);
            return next(err);
          }

          var ids = [];
          for (var i = 0; i < result.length; i++) {
            ids.push(result[i].id);
          };

          Location.find({
            'where': {
              'id': {
                'inq': ids
              }
            }
          }, function(err, res) {
            next(err, res);
          });
        });
    }


    Location.nearTo = function(lat, lng, limit, cb) {
        limit = Math.min(limit, 10)
        Location.sortOfHackyLocationQuery(lat, lng, limit, function(err, result) {
            cb(err, result);
        });
    };
    Location.remoteMethod(
        'nearTo',
        {
          http: { path: '/near', verb: 'get' },
          description: "Gets the locations near to a specified latitude and longitude.",
          accepts: [
            { arg: 'lat', type: 'number' },
            { arg: 'lng', type: 'number' },
            { arg: 'limit', type: 'number' }
          ],
          returns: { arg: 'location', type: 'location' }
        }
  );

};
