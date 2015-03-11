angular
  .module('tas')
  .controller('ShowController', ShowController);

function ShowController($routeParams, taFactory) {
  var vm = this,
      id = $routeParams.uuid;

  taFactory.findOne(id, function (ta) {
    vm.ta = ta;
  });
}