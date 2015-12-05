var GeoPoint = require('loopback').GeoPoint;

module.exports = function(Location) {
    Location.nearTo = function(lat, lng, cb) {
        console.log('-------------------------->');
        console.log(lat);
        console.log(lng);
        console.log('-------------------------->');

        var here = new GeoPoint({lat: lat, lng: lng});
        Location.find( {where: {location: {near: here}}, limit: 3}, function(err, nearbyLocations) {
            cb(err, nearbyLocations);
        });
    };
    Location.remoteMethod(
        'nearTo',
        {
          http: { path: '/near', verb: 'get' },
          description: "Gets the locations near to a specified latitude and longitude.",
          accepts: [
            { arg: 'lat', type: 'number' },
            { arg: 'lng', type: 'number' }
          ],
          returns: { arg: 'location', type: 'location' }
        }
  );

};
