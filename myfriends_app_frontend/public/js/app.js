const app = angular.module('Myfriends_App', ['ngRoute']);

// ROUTES CONFIGURATION
app.config(function($routeProvider) {

  $routeProvider
    .when('/', {
      controller: 'loginCtr',
      templateUrl: '/views/landing-page.html',
      controllerAs: 'vm'
    })
    // .when('/register', {
    //   controller: 'loginCtr',
    //   templateUrl: '/views/register.html',
    //   controllerAs: 'vm'
    //   //Added a meals config
    // })
    .when('/login', {
      controller: 'loginCtr',
      templateUrl: '/views/login.html',
      reloadOnSearch: false,
      controllerAs: 'vm'
    })
    // .when('/dashboard', {
    //   resolve: {
    //     "check": function($location, $rootScope) {
    //       if (!$rootScope.loggedIn) {
    //         $location.path('/');
    //       }
    //     }
    //   },
    //   templateUrl: '/views/dashboard.html',
    //   controller: 'loginCtr',
    //   controllerAs: 'vm'
    // })
    .otherwise({
      redirectTo: '/'
    });
});

app.config(['$qProvider', function($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);


// LOGIN CONTROLLER
app.controller('loginCtr', ['$http', '$scope', '$location', '$rootScope', function($http, $scope, $location, $rootScope) {
  this.url = 'http://localhost:3000';

  this.login = function() {
    console.log(this.formdata);
    $http({
      method: 'POST',
      url: this.url + '/users/login',
      data: {
        user: {
          username: this.formdata.username,
          password: this.formdata.password
        }
      }
    }).then(function(response) {
      console.log(response.data);
      $rootScope.currentUser = response.data.user;
      localStorage.setItem('token', JSON.stringify(response.data.token));
    }.bind(this));

  }; // end login function

  this.logout = function() {
    localStorage.clear('token');
    location.reload();
  }

  this.getUsers = function() {

    $http({
      url: this.url + '/usrs',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }
    }).then(function(response) {
      console.log(response);
      if (response.data.status == 401) {
        this.error = "Unauthorized";
      } else {
        this.users = response.data;
      }
    }.bind(this));

  }; // end getUsers function



}]);
