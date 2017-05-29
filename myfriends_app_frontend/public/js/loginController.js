(function() {
  'use strict';

  angular
    .module('Myfriends_App')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$http', '$scope', '$location', '$rootScope', '$window'];

  function LoginController($http, $scope, $location, $rootScope, $window) {

    this.url = 'http://localhost:3000';
    // $rootScope.currentUser = {};
    var vm = this;


    // Login
    this.login = function() {

      console.log(this.formLogin);
      vm.dataLoading = true;

      $http({
        method: 'POST',
        url: this.url + '/users/login',
        data: {
          user: {
            username: this.formLogin.username,
            password: this.formLogin.password
          }
        }
      }).then(function(response) {
        console.log(response.data);

        if (response.data.status == 401) {
          $rootScope.error_msg = "Unauthorized";
          vm.dataLoading = false;
        } else {
          $rootScope.currentUser = response.data.user;
          localStorage.setItem('token', JSON.stringify(response.data.token));
          $window.localStorage.setItem('user', JSON.stringify(response.data.user));

          $window.localStorage.setItem('friends', JSON.stringify(response.data.friends));


          $rootScope.friends = response.data.friends;
          // this.getGoogleMap();
          // $scope.mapController.getGoogleMap();
          // $rootScope.loggedIn = true;
          vm.dataLoading = false;
          $rootScope.retrieveGoogleMap = true;
          $location.path('/dashboard');
        };

      }.bind(this));

    }; // end login function


    // Logout
    this.logout = function() {
      console.log("Logout");
      localStorage.clear('token');
      $scope.error_msg = null;
      $window.localStorage.removeItem('user');
      $window.localStorage.removeItem('friends');
      location.reload();
      $location.path("/");
    }; // End logout function

    // create user...from register form
    // SENDS CREATE USER REQUEST TO BACKEND
    this.register = function() {
      $rootScope.errorMessage = null;
      vm.dataLoading = true;
      console.log("Register");
      console.log(this.registerFormData);

      $http({
        method: 'POST',
        url: this.url + '/users',
        data: this.registerFormData
      }).then(function(result) {

        console.log(result.data);

        if (result.data.error) {
          $rootScope.error_msg = result.data.error;
          vm.dataLoading = false;
        } else {
          vm.dataLoading = false;
          $location.path('/dashboard');
        };


      }.bind(this));

    }; // end register function


    // Get all users
    this.getUsers = function() {

      $http({
        url: this.url + '/users',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(function(response) {
        console.log(response);
        if (response.data.status == 401) {
          $rootScope.error = "Unauthorized";
        } else {
          this.users = response.data;
        }
      }.bind(this));

    }; // end getUsers function

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
      console.log(friends);

      for (let i = 0; i < friends.length; i++) {
        console.log(friends[i]);
        createMarker(friends[i]);
      };

      $scope.openInfoWindow = function(e, selectedMarker) {
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
      }

    }; // end getGoogleMap function

  }; // end

})();
