angular
  .module('tas')
  .controller('EditController', EditController);

function EditController($routeParams, $location, taFactory) {
  var vm = this,
      id = $routeParams.uuid;

  taFactory.findOne(id, function (ta) {
    vm.newTA = ta;
  });

  vm.addOrEditTA = function () {
    taFactory.update(id, vm.newTA, function () {
      $location.path('/tas')
    });
  };
}
