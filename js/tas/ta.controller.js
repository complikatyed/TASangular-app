angular
  .module('tas')
  .controller('TasController', TasController);

function TasController($location, taFactory) {
  var vm = this;

  taFactory.findAll(function (tas) {
    vm.data = tas;
  })

  vm.addOrEditTA = function () {
    vm.newTA.name = 'Adam';
    vm.newTA.nickName = vm.newTA.firstName[0].toUpperCase() + 'Adam';

    taFactory.create(vm.newTA, function(res) {
      vm.data[res.name] = vm.newTA;
      $location.path('/tas')
    });
  };

  vm.removeTA = function (id) {
    taFactory.delete(id, function () {
      delete vm.data[id];
    });
  };

  vm.updateTA = function (id) {
    taFactory.update(id, vm.data[id]);
  };
}