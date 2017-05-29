(function() {
  'use strict';

  angular
    .module('Myfriends_App')
    .controller('mapsController', mapsController);
  mapsController.$inject = ['$http', '$scope', '$location', '$rootScope', '$window', 'ngMap'];

  function mapsController($http, $scope, $location, $rootScope, $window, ngMap) {

    $rootScope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHRNhMc4TEHz_kgIaRp-izynjxzTR8_ss";

    NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });

  }; // end mapsController function


})();
