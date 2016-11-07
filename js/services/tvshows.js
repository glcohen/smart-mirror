(function(annyang) {
    'use strict';

    function TVShowService($http, $q) {
        var service = {};
        service.feed = [];
        service.currentFeed = 0;

        service.init = function() {
            service.feed = [];
            service.currentFeed = 0;
            var currentTime = new moment();

            if (typeof config.tvshows != 'undefined'){
                var promises = [];
                angular.forEach(config.tvshows.shows, function(show) {
                    promises.push($http.get('http://epguides.frecar.no/show/' + show.replace(/\s|\./g, '') + '/next/'));
                });

                return $q.all(promises).then(function(response) {
                  var feedEntry = {
                        title  : response['0'].data.episode.title,
                        content: response['0'].data.episode.release_date,
                        lastUpdated : currentTime,
                  };
                  service.feed.push(feedEntry);
                });
            }
        };

        service.refreshTVShowsList = function() {
          return service.init().then(function(entries) {
            return entries;
          });
        };

        service.getShows = function() {
            if (service.feed == null) {
                return null;
            }
            if (service.currentFeed == (service.feed.length-1)) {
                service.currentFeed = 0;
            }
            else {
                service.currentFeed = service.currentFeed + 1;
            }
            return service.feed[service.currentFeed];
        };
        return service;
    }

    angular.module('SmartMirror')
        .factory('TVShowService', TVShowService);

}(window.annyang));
