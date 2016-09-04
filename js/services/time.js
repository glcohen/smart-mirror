  (function() {
    'use strict';

    function getTime() {
      var currentTime = new Date();
      var hours = currentTime.getHours();
      var minutes = currentTime.getMinutes();
      var t = "The time is ";
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (hours > 11) {
        if (hours != 12) {
          hours = hours - 12;
        }
        t += hours + ":" + minutes + " " + "PM";
      }

      else { // hours <= 11
        t += hours + ":" + minutes + " " + "AM";
      }

      return t;
    }

    function TimeService() {
        var service = {};

        service.speakTime = function(msg) {
          vocal("Testing 1 2 3 Testing One Two Three.. Is this thing on?");
          console.log("\"" + getTime() + '\" has been spoken');
        };
        return service;
    }

    angular.module('SmartMirror')
      .factory('TimeService', TimeService);
  }());
