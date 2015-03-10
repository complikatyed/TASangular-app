angular
  .module('tas', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/tas', {
        templateUrl: 'views/table.html',
        controller: 'TasController',
        controllerAs: 'tas'
      })
      .when('/tas/new', {
        templateUrl: 'views/form.html',
        controller: 'TasController',
        controllerAs: 'tas'
      })
      .when('/tas/:uuid', {
        templateUrl: 'views/show.html',
        controller: 'ShowController',
        controllerAs: 'show'
      })
      .when('/tas/:uuid/edit', {
        templateUrl: 'views/form.html',
        controller: 'EditController',
        controllerAs: 'tas'
      })
      .otherwise({
        redirectTo: '/tas'
      })
  })
  .service('taService', function ($http) {
    var tas = {};

    tas.findOne = function (id, cb) {
      $http
        .get('https://angularmc.firebaseio.com/tas/' + id + '.json')
        .success(function (data) {
          cb(data)
      });
    };

    tas.findAll = function (cb) {
      $http
        .get('https://angularmc.firebaseio.com/tas.json')
        .success(function (data){
          cb(data);
        });
    };

    tas.create = function (data, cb) {
      $http
        .post('https://angularmc.firebaseio.com/tas.json', data)
        .success(function (res) {
          cb(res);
        });
    };

    tas.delete = function (id, cb) {
      var url = 'https://angularmc.firebaseio.com/tas/' + id + '.json';

      $http
        .delete(url)
        .success(function () {
          cb();
        });
    };

    tas.update = function (id, data) {
      var url = 'https://angularmc.firebaseio.com/tas/' + id + '.json';

      $http
        .put(url, data);
    };

    return tas;
  })
  .controller('EditController', function ($routeParams, $http, $location, taService) {
    var vm = this,
        id = $routeParams.uuid;

    taService.findOne(id, function(ta){
      vm.newTA = ta;
    })

    vm.addOrEditTA = function () {
      $http
        .put('https://angularmc.firebaseio.com/tas/' + id + '.json',
          vm.newTA
        )
        .success(function (data) {
          $location.path('/tas')
      });
    }
  })
  .controller('ShowController', function ($routeParams, taService) {
    var vm = this,
        id = $routeParams.uuid;

    taService.findOne(id, function (ta) {
      vm.ta = ta;
    });

  })
  .controller('TasController', function ($scope, $http, $location, taService) {
    var vm = this;

    taService.findAll(function (tas) {
      vm.data = tas;
    })

    vm.addOrEditTA = function () {
      vm.newTA.name = 'Adam';
      vm.newTA.nickName = vm.newTA.firstName[0].toUpperCase() + 'Adam';

      taService.create(vm.newTA, function(res) {
        vm.data[res.name] = vm.newTA;
        $location.path('/tas')
      });
    };

    vm.removeTA = function (id) {
      taService.delete(id, function () {
        delete vm.data[id];
      });
    };

    vm.updateTA = function (id) {
      // var url = 'https://angularmc.firebaseio.com/tas/' + id + '.json';
      // $http
      //   .put(url, vm.data[id]);
      taService.update(id, vm.data[id]);
    };
  });
