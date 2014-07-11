//Create a new Angular Module for the earBudsApp. 
var earBudsApp = angular.module("earBudsApp", ['ngRoute']);



earBudsApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl',
            activetab: 'home'
        }).
        when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl',
            activetab: 'profile'
        }).
        when('/musicians', {
            templateUrl: 'views/musicians.html',
            controller: 'MusiciansCtrl',
            activetab: 'musicians'
        }).
          when('/register', {
              templateUrl: 'views/register.html',
              controller: 'RegisterCtrl',
              activetab: 'register'
          }).
          when('/musicians/jazz', {
              templateUrl:'views/jazz.html',
              controller: 'MusiciansCtrl',
              activetab: 'jazz'
          }).
          when('/musicians/genre', {
              templateUrl: 'views/genre.html',
              controller: 'MusiciansCtrl',
              activetab: 'genre'
          }).
          when('/views/callback.html', {
              templateUrl: 'views/callback.html',
              controller: 'CallbackCtrl',
              activetab: 'callback'
          }).
        otherwise({
            redirectTo: '/home'
        });
  }]);


//Create the MainCtrl Controller...
earBudsApp.controller("MainCtrl", ['$scope', '$http', '$route', function ($scope, $http, $route) {
    $scope.$route = $route;
}]);

//creating the profile controller
earBudsApp.controller("ProfileCtrl", ['$scope', '$http', '$route', function ($scope, $http, $route) {
    $scope.$route = $sroute;
}]);

//creating the musicians controller
earBudsApp.controller("MusiciansCtrl", ['$scope', '$http', '$route', function ($scope, $http, $route) {
    $scope.$route = $sroute;
}]);

//creating the Register controller
earBudsApp.controller("RegisterCtrl", ['$scope', '$http', '$route', function ($scope, $http, $route) {
    $scope.$route = $sroute;
}]);




