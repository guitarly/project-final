(function() {
  'use strict';

  angular
    .module('Myfriends_App')
    .controller('FriendController', LoginController);

  FriendController.$inject = ['$http', '$scope', '$location', '$rootScope'];

  function FriendController($http, $scope, $location, $rootScope) {
    console.log("FriendController");

    this.url = 'http://localhost:3000';
    var vm = this;

  } // end FriendController function

})();
