module.exports = function(City) {
  City.search = function(query, callback) {
    City.find(
      {
        where: {
          name: {
            like: '%' + query + '%'
          }
        },
        include: [
          'region'
        ],
        limit: 50
      }, function (err, results) {
        results.forEach(function(result) {
          var region = result.region();
          result.title = result['name'] + ', ' + region.code;
        });
        callback(null, results);
      }
    );
  };

  City.remoteMethod(
    'search',
    {
      http: { verb: 'get' },
      accepts: { arg: 'query', type: 'string' },
      returns: { arg: 'results', type: [ 'object' ] }
    }
  );
};
