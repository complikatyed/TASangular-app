angular
  .module('tas', [])
  .controller('TasController', function () {
    var vm = this;

    vm.data = [
      {
        nickName: 'TAdam',
        name: 'Adam',
        firstName: 'Adam',
        lastName: 'Kèésecker',
        current: true
      },
      {
        nickName: 'ZAdam',
        name: 'Adam',
        firstName: 'Zöe',
        lastName: 'Ames',
        current: true
      },
      {
        nickName: 'JuAdam',
        name: 'Adam',
        firstName: 'Juan',
        lastName: 'Rødrįguež',
        current: true
      },
      {
        nickName: 'BrAdam',
        name: 'Adam',
        firstName: 'Brian',
        lastName: 'Hiått',
        current: false
      },
      {
        nickName: 'BAdam',
        name: 'Adam',
        firstName: 'Adam',
        lastName: 'Barñhærd',
        current: false
      }
    ];

    vm.addTA = function () {
      var obj = {
        nickName: vm.newName,
        firstName: vm.newFirstName,
        lastName: vm.newLastName
      };

      vm.data.push(obj);

      vm.newName = null;
      vm.newFirstName = null;
      vm.newLastName = null;
    }

    vm.removeTA = function (person) {
      var index = vm.data.indexOf(person);
      vm.data.splice(index, 1);
    };

  });
