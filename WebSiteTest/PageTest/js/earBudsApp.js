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
        otherwise({
            redirectTo: '/home'
        });
  }]);


//Create the MainCtrl Controller...
earBudsApp.controller("MainCtrl", ['$scope', '$http', '$route', function ($scope, $http, $route) {
    $scope.$route = $route;
}]);

//creating the profile controller
earBudsApp.controller("ProfileCtrl", ['$scope', '$http', '$route', function($scope, $http, $route) {
    $scope.$route = $sroute;
}])


//Create the StationsCtrl Controller...
bartNowApp.controller("StationsCtrl", ['$scope', '$http', 'GeolocationService',
  function ($scope, $http, geoLocationService) {

      $scope.stations = [];
      //Start with an empty position and a default status...
      $scope.position = {};
      $scope.geoLocationStatus = "Determining Position....";

      $scope.getPosition = function () {
          //Get the position from our GeoLocationService
          geoLocationService().then(function (position) {
              //If we got a position back, save it to the $scope.position
              $scope.position = { latitude: position.coords.latitude, longitude: position.coords.longitude };
              //And update the status
              $scope.geoLocationStatus = "Position Retrieved! (" + $scope.position.latitude + "," + $scope.position.longitude + ")";
          }, function (reason) {
              //otherwise, there was an error.  
              //Use a fake position if you can't use GPS on your device...
              //Microsoft SF Office: (37.785027,-122.406749 - http://binged.it/TZjpC6)
              $scope.position = { latitude: 37.785027, longitude: -122.406749 };
              $scope.geoLocationStatus = "Position could not be determined: " + reason + " Using Fake Position! (" + $scope.position.latitude + "," + $scope.position.longitude + ")";

          });

          //regardless of the position, get the stations.  
          //we waited to get stations because if the position is available
          //we can (eventually) pass it to the backend service to get 
          //stations sorted by their distance from our position 
          $scope.getStations();
      };

      $scope.getStations = function () {
          //var stationsUrl = 'data/stations.json';
          //var stationsUrl = 'http://bartnowapidemo.azurewebsites.net/api/stations?lat=' + $scope.position.latitude + '&lon=' + $scope.position.longitude;
          var stationsUrl = 'http://bartwebmaya.azurewebsites.net/api/stations';
          /*if ($scope.position)
          {
              stationsUrl += '?lat=' + $scope.position.latitude + '&lon=' + $scope.position.longitude;
          }*/
          {
              stationsUrl += '?lat=37&lon=-122';
          }

          $http.get(stationsUrl).success(function (result) {
              $scope.stations = result;
          });
      }

      //Call getPositiion() to get the current position. 
      //getPosition() then calls getStation() to retrieve the station data for us
      $scope.getPosition();

  }]);

//Create the Trains Controller...
bartNowApp.controller("TrainsCtrl", ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

    $scope.stationAbbr = $routeParams.stationAbbr;
    $scope.station = null;


    $scope.getStations = function () {
        //var stationsUrl = 'data/stations.json';
        //var stationsUrl = 'http://bartnowapidemo.azurewebsites.net/api/etd/' + $scope.stationAbbr;
        var stationsUrl = 'http://bartwebmaya.azurewebsites.net/api/etd/' + $scope.stationAbbr;

        //Go get all the stations from the data source
        $http.get(stationsUrl).success(function (result) {
            //If you call a service, and get a single station back just set the station to the result
            $scope.station = result[0];

            //Use using the sample data though, all stations are returned
            //Loop through them until you find the matching one
            for (var i in result) {
                if (result[i].abbr === $scope.stationAbbr) {
                    $scope.station = result[i];
                    break;
                }
            }
        });
    }

    $scope.getStations();

}]);

