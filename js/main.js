angular
  .module('tas', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/table.html',
        controller: 'TasController',
        controllerAs: 'tas'
      })
      .when('/new', {
        templateUrl: 'views/form.html',
        controller: 'TasController',
        controllerAs: 'tas'
      })
      .otherwise({
        redirectTo: '/'
      })
  })
  .controller('TasController', function ($scope, $http) {
    var vm = this;

    // $http.put('https://angularmc.firebaseio.com/tas.json',
    // [
    //   {
    //     nickName: 'TAdam',
    //     name: 'Adam',
    //     firstName: 'Adam',
    //     lastName: 'Kèésecker',
    //     current: true,
    //     cohort: 5
    //   },
    //   {
    //     nickName: 'ZAdam',
    //     name: 'Adam',
    //     firstName: 'Zöe',
    //     lastName: 'Ames',
    //     current: true,
    //     cohort: 6
    //   },
    //   {
    //     nickName: 'JuAdam',
    //     name: 'Adam',
    //     firstName: 'Juan',
    //     lastName: 'Rødrįguež',
    //     current: true,
    //     cohort: 6
    //   },
    //   {
    //     nickName: 'BrAdam',
    //     name: 'Adam',
    //     firstName: 'Brian',
    //     lastName: 'Hiått',
    //     current: false,
    //     cohort: 6
    //   },
    //   {
    //     nickName: 'BAdam',
    //     name: 'Adam',
    //     firstName: 'Adam',
    //     lastName: 'Barñhærd',
    //     current: false,
    //     cohort: 6
    //   }
    // ]);

    $http
      .get('https://angularmc.firebaseio.com/tas.json')
      .success(function (data){
        vm.data = data;
      });


    vm.addTA = function () {
      vm.newTA.name = 'Adam';
      vm.newTA.nickName = vm.newTA.firstName[0].toUpperCase() + 'Adam';

      $http
        .post('https://angularmc.firebaseio.com/tas.json', vm.newTA)
        .success(function (res) {
          vm.data[res.name] = vm.newTA;
          _clearNewTA();
        });
    };

    vm.removeTA = function (id) {
      // var index = vm.data.indexOf(person);
      // vm.data.splice(index, 1);
      var url = 'https://angularmc.firebaseio.com/tas/' + id + '.json';
      $http
        .delete(url)
        .success(function () {
          delete vm.data[id];
        });
    };

    vm.updateTA = function (id) {
      var url = 'https://angularmc.firebaseio.com/tas/' + id + '.json';
      $http
        .put(url, vm.data[id]);
    };

    function _clearNewTA() {
      vm.newTA = {};
      $scope.newTA.$setPristine();
    }

  });
