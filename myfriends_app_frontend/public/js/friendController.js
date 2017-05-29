(function() {
  'use strict';

  angular
    .module('Myfriends_App')
    .controller('FriendController', FriendController);

  FriendController.$inject = ['$http', '$scope', '$location', '$rootScope', '$window'];

  function FriendController($http, $scope, $location, $rootScope, $window) {


    this.url = 'http://localhost:3000';
    var vm = this;
    this.submitNewFriend = function() {
      let userId = $rootScope.currentUser.id;
      // this.frienddata.user_id = userId;

      $http({
        method: 'POST',
        url: this.url + '/users/' + userId + '/friends',
        data: {
          friend: this.frienddata,
          userID: userId
        }

      }).then(function(response) {
        if (response.data.status == 401) {
          $rootScope.error_msg = "Error - Friend can't be save";
          vm.dataLoading = false;
        } else {

          $rootScope.friends = response.data;
          $window.localStorage.setItem('friends', JSON.stringify(response.data));

          vm.dataLoading = false;
          this.getGoogleMap();
          // $rootScope.loggedIn = true;
          $location.path('/dashboard');
        };

      }.bind(this));

    }; // end submitNewFriend function

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

        // '<img ng-src='" + info.image + "' style='width: 40px; height:40px />'"
        // marker.content = '<div class="infoWindowContent">' + info.name + '<br />' + info.fulladdress + ' ,<br/>' + info.phone + '  </div>';

        marker.content = '<div class="infoWindowContent">' + '<br />' + info.fulladdress + ' ,<br/>' + info.phone + '  </div>';

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

        createMarker(friends[i]);
      };

      $scope.openInfoWindow = function(e, selectedMarker) {
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
      }

    }; // end getGoogleMap function


    this.init = function() {
      if ($rootScope.retrieveGoogleMap) {
        this.getGoogleMap();
        $rootScope.retrieveGoogleMap = !$rootScope.retrieveGoogleMap;
      };

    };

    this.init();


  }; // end FriendController function



})();
