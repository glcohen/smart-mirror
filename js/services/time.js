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


    function TimeService(vocal) {
        var service = {};
        //var vocal = require(__dirname + "/node_modules/vocal/lib/vocal.js");
        service.speakTime = function(msg) {
          vocal("The time is" + getTime());
          console.log("\"" + getTime() + '\" has been spoken');
        };

        // var msg = new SpeechSynthesisUtterance(getTime());
        // speechSynthesis.speak(msg);
        return service;
    }

    angular.module('SmartMirror')
      .factory('TimeService', TimeService);
  }());
