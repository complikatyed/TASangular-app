angular
  .module('tas')
  .config(authConfig);

function authConfig($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'js/auth/login.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    })
    .when('/logout', {
      template: '',
      controller: 'LogoutController'
    });
}
