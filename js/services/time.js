  (function() {
    'use strict';

    // Gets time in 12-hour format
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
      } else { // hours <= 11
        t += hours + ":" + minutes + " " + "AM";
      }

      return t;
    }


    function TimeService() {
        var service = {}; // blank service
        var say = require('say');
        service.speakTime = function(msg) { // actual do it
          say.speak(getTime(), 'voice_kal_diphone', 0.5);
        };
        return service; // donezo
    }

    angular.module('SmartMirror')
      .factory('TimeService', TimeService);
  }());
