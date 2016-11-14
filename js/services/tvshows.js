(function(annyang) {
  'use strict';

  function TVShowService($window, $http, $q) {
    var service = {};
    service.shows = [];

    service.init = function() {
      var promises = [];
      service.shows = [];

      // angular.forEach(config.tvshows.shows, function(show) {
      //     console.log("SHOW IS: " + show);
      //     promises.push($http.get('http://epguides.frecar.no/show/' + show.replace(/\s|\./g, '') + '/next/'));
      // });

      angular.forEach(config.tvshows.shows, function(show) {
      promises.push($http.get('http://epguides.frecar.no/show/' + show.replace(/\s|\./g, '') + '/next/')
        .catch(function() {
          console.log("No response for show: " + show);
        }));
      });

      return $q.all(promises).then(function(response) {
        console.log("Here with this many responses: " + response.length);
            for (var i = 0; i < response.length; i++) {
                if (response[i].data != undefined) {
                  service.shows.push(response[i]);
                }
                //console.log("Episode title: " + response[i].data.episode.show.title);
                //console.log("Next air date: " + response[i].data.episode.release_date);
            }
      });
    };

    service.refreshTVShows = function() {
      return service.init().then(function(entries) {
        return entries;
      });
    };

    service.getTVShows = function() {
      return service.shows;
    };

    return service;
  }


  angular.module('SmartMirror')
    .factory('TVShowService', TVShowService);
}(window.annyang));

// (function(annyang) {
//   'use strict';
//
//   function TVShowService($window, $http, $q) {
//     var service = {};
//     service.shows = [];
//
//     service.getTVShows = function() {
//       var promises = [];
//       service.shows = [];
//
//       angular.forEach(config.tvshows.shows, function(show) {
//           console.log("SHOW IS: " + show);
//           promises.push($http.get('http://epguides.frecar.no/show/' + show.replace(/\s|\./g, '') + '/next/'));
//       });
//
//       $q.all(promises).then(function(response) {
//         console.log("Here with this many responses: " + response.length);
//             for (var i = 0; i < response.length; i++) {
//                 //console.log("Episode title: " + response[i].data.episode.show.title);
//                 //console.log("Next air date: " + response[i].data.episode.release_date);
//                 service.shows.push(response[i]);
//             }
//       });
//       console.log("ser.shows is: " + service.shows.toString());
//       console.log("ser.shows len: " + service.shows.length);
//       return service;
//     }
//
//     return service;
//   }
//
//
//   angular.module('SmartMirror')
//     .factory('TVShowService', TVShowService);
// }(window.annyang));

// (function(annyang) {
//   'use strict';
//
//   function TVShowService($window, $http, $q) {
//     var service = {};
//
//     service.getTVShows = function() {
//       var deferred = $q.defer();
//       if (config.tvshows.shows.length) {
//         var show = config.tvshows.shows.toString();
//         console.log("SHOW IS: " + show);
//         var url = 'http://epguides.frecar.no/show/' + show.replace(/\s|\./g, '') + '/next/';
//         $http.get(url).then(function(response) {
//           deferred.resolve(response.data);
//         }, function(error) {
//           deferred.reject('Unknown error');
//         });
//       }
//
//       return deferred.promise;
//     }
//
//     return service;
//   }
//
//   angular.module('SmartMirror')
//     .factory('TVShowService', TVShowService);
// }(window.annyang));
