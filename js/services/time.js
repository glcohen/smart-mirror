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
        // var vocal = require(__dirname + "/node_modules/vocal/lib/vocal.js");
        // service.speakTime = function(msg) {
        //   vocal("Testing 1 2 3 Testing One Two Three.. Is this thing on?");
        //   console.log("\"" + getTime() + '\" has been spoken');
        // };
        //Declare the speech object & set attributes
        var utterance = new window.SpeechSynthesisUtterance();
        utterance.lang = 'en-US';
        utterance.volume = 1.0;
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.text = "I'm a working voice, oh shit!";

        //Speak the phrase
        window.speechSynthesis.speak(utterance);

        window.speechSynthesis.onvoiceschanged = function () {
          var speechSynthesisVoices = speechSynthesis.getVoices();
          var accents = _(speechSynthesisVoices).pluck('lang');
          var voices = _(speechSynthesisVoices).pluck('voiceURI');
          var names = _(speechSynthesisVoices).pluck('name');
          console.log('names', names);
          console.log('accents', _.uniq(accents));
          console.log('voices', voices);
        };

        // var msg = new SpeechSynthesisUtterance(getTime());
        // speechSynthesis.speak(msg);
        return service;
    }

    angular.module('SmartMirror')
      .factory('TimeService', TimeService);
  }());
