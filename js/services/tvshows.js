(function(annyang) {
  'use strict';

  function TVShowService($window, $http, $q) {
    var service = {};
    service.shows = [];

    service.init = function() {
      var promises = [];
      service.shows = [];

      angular.forEach(config.tvshows.shows, function(show) {
      promises.push($http.get('http://epguides.frecar.no/show/' + show.replace(/\s|\./g, '') + '/next/')
        .catch(function() {
          console.log("No response for show: " + show);
          return "";
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
