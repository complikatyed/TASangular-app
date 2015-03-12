angular
  .module('tas')
  .controller('LogoutController', LogoutController)

function LogoutController($rootScope, $scope, $location, authFactory) {
  authFactory.logout(function () {
    delete $rootScope.user;
    $location.path('/login');
    $scope.$apply();
  });
}
