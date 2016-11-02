  (function() {
    'use strict';

    // Gets time in 12-hour format
    function getTime() {
      var currentTime = new Date();
      var hours = currentTime.getHours();
      var minutes = currentTime.getMinutes();
      var time = "The time is ";
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      else if (hours > 11) {
        if (hours != 12) {
          hours = hours - 12;
        }
        time += hours + ":" + minutes + " " + "PM";
      } else { // hours <= 11
        time += hours + ":" + minutes + " " + "AM";
      }
      return time;
    }


    function TimeService() {
        var service = {};
        var say = require('say');
        service.speakTime = function(msg) {
          say.speak(getTime());
          // say.speak(getTime(), 'voice_kal_diphone', 0.5); // Change parameters to use a different voice or change the speed
        };
        return service; // donezo
    }

    angular.module('SmartMirror')
      .factory('TimeService', TimeService);
  }());
