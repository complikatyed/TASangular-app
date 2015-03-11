angular
  .module('tas')
  .config(tasConfig);


function tasConfig($routeProvider) {
  $routeProvider
    .when('/tas', {
      templateUrl: 'js/tas/table.html',
      controller: 'TasController',
      controllerAs: 'tas'
    })
    .when('/tas/new', {
      templateUrl: 'js/tas/form.html',
      controller: 'TasController',
      controllerAs: 'tas'
    })
    .when('/tas/:uuid', {
      templateUrl: 'js/tas/show.html',
      controller: 'ShowController',
      controllerAs: 'show'
    })
    .when('/tas/:uuid/edit', {
      templateUrl: 'js/tas/form.html',
      controller: 'EditController',
      controllerAs: 'tas'
    })
    .otherwise({
      redirectTo: '/tas'
    })
}