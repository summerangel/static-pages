(function() {
  'use strict';

  angular
    .module('tradingsite')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/home', {
        templateUrl: 'app/home/home.html',
        controller: 'homeController',
        controllerAs: 'home'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
