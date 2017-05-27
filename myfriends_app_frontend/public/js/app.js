(function() {
  'use strict';

  // const app = angular.module('Myfriends_App', ['ngRoute', 'ngCookies']);
  angular
    .module('Myfriends_App', ['ngRoute', 'ngCookies'])
    .config(config)
    .run(run);



  // ROUTES CONFIGURATION
  // app.config(function($routeProvider) {
  config.$inject = ['$routeProvider', '$locationProvider'];

  function config($routeProvider, $locationProvidere) {

    $routeProvider
      .when('/', {
        controller: 'LoginController',
        templateUrl: '/views/landing-page.html',
        controllerAs: 'vm'
      })
      .when('/register', {
        controller: 'LoginController',
        templateUrl: '/views/register.html',
        controllerAs: 'vm'
        //Added a meals config
      })
      .when('/login', {
        controller: 'LoginController',
        templateUrl: '/views/login.html',
        reloadOnSearch: false,
        controllerAs: 'vm'
      })
      .when('/dashboard', {
        // resolve: {
        //   "check": function($location, $rootScope) {
        //     if (!$rootScope.loggedIn) {
        //       $location.path('/');
        //     }
        //   }
        // },
        templateUrl: '/views/dashboard.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });

  }; // end function

  run.$inject = ['$rootScope', '$location', '$cookies', '$http'];

  function run($rootScope, $location, $cookies, $http) {
    console.log("Im in the run function");
    // keep user logged in after page refresh
    $rootScope.globals = $cookies.getObject('globals') || {};

    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
      // redirect to login page if not logged in and trying to access a restricted page
      console.log("in rootScope");
      var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
      // var loggedIn = $rootScope.globals.currentUser;

      var loggedIn = $rootScope.currentUser;
      if (restrictedPage && !loggedIn) {
        $location.path('/');
      }
    });
  }; // end run function


  // // Server - set cookies
  // app.factory("userPersistenceService", [
  //   "$cookies",
  //   function($cookies) {
  //     var userName = "";
  //
  //     return {
  //       setCookieData: function(username) {
  //         userName = username;
  //         $cookies.put("userName", username);
  //       },
  //       getCookieData: function() {
  //         userName = $cookies.get("userName");
  //         return userName;
  //       },
  //       clearCookieData: function() {
  //         userName = "";
  //         $cookies.remove("userName");
  //       }
  //     };
  //   }
  // ]);


})();
