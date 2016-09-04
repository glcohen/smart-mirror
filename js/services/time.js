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

        // For TTS using 'say' https://github.com/marak/say.js/
        var say = require('say');
        service.speakTime = function(msg) {
          say.speak('TEST TEST TEST', 'voice_kal_diphone', 0.5, function(err) {
            if (err) {
              return console.error(err);
            }
            console.log("\"" + getTime() + '\" has been spoken');
          });
        return service;
    }

    angular.module('SmartMirror')
      .factory('TimeService', TimeService);
  }());
