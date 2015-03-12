angular
  .module('tas')
  .controller('LogoutController', LogoutController)

function LogoutController($scope, $location, authFactory) {
  authFactory.logout(function(){
    $location.path('/login');
    $scope.$apply();
  });
}
