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
      console.log(this.frienddata);
      let userId = $rootScope.currentUser.id;
      this.frienddata.user_id = userId;

      $http({
        method: 'POST',
        url: this.url + '/users/' + userId + '/friends',
        data: {
          friend: this.frienddata,
          userID: userId
        }

      }).then(function(response) {
        console.log(response.data);

        if (response.data.status == 401) {
          $rootScope.error_msg = "Error - Friend can't be save";
          vm.dataLoading = false;
        } else {
          console.log(response.data);
          $rootScope.friends = response.data;
          $window.localStorage.setItem('friends', JSON.stringify(response.data));

          vm.dataLoading = false;
          this.getGoogleMap();
          // $rootScope.loggedIn = true;
          $location.path('/dashboard');
        };

      }.bind(this));

    }; // end submitNewFriend function

  }; // end FriendController function

  // GET Maps for all Friends' Address
  this.getGoogleMap = function() {

  }; // end getGoogleMap function

})();
