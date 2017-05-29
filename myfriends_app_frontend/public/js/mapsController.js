(function() {
  'use strict';

  angular
    .module('Myfriends_App')
    .controller('mapsController', mapsController);
  mapsController.$inject = ['$http', '$scope', '$location', '$rootScope', '$window', 'ngMap'];

  function mapsController($http, $scope, $location, $rootScope, $window, ngMap) {

    $rootScope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHRNhMc4TEHz_kgIaRp-izynjxzTR8_ss";

    // NgMap.getMap().then(function(map) {
    //   console.log(map.getCenter());
    //   console.log('markers', map.markers);
    //   console.log('shapes', map.shapes);
    // });


    // GET Maps for all Friends' Address
    this.getGoogleMap = function() {

      var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(33, -77),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      $scope.markers = [];
      var infoWindow = new google.maps.InfoWindow();

      var createMarker = function(info) {

        var marker = new google.maps.Marker({
          map: $scope.map,
          position: new google.maps.LatLng(info.latitude, info.longitude),
          title: info.name
        });


        // marker.content = '<div class="infoWindowContent">' + info.name + '<br />' + info.fulladdress + ' ,<br/>' + info.phone + '  </div>';

        marker.content = '<div class="infoWindowContent">' + "<img ng-src='" + info.image + "' style='width: 40px; height:40px />'" + '<br />' + info.fulladdress + ' ,<br/>' + info.phone + '  </div>';

        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.setContent('<h2>' + marker.title + '</h2>' +
            marker.content);
          infoWindow.open($scope.map, marker);
        });

        // console.log(marker);
        $scope.markers.push(marker);

      };

      // var storageFriends = $window.localStorage.getItem('friends');
      var friends = $rootScope.friends;

      for (let i = 0; i < friends.length; i++) {
        console.log(friends[i]);
        createMarker(friends[i]);
      };

      $scope.openInfoWindow = function(e, selectedMarker) {
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
      }

    }; // end getGoogleMap function

  }; // end mapsController function


})();
