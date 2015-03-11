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
  .value('BASE_URL', 'https://angularmc.firebaseio.com')
  .factory('taFactory', function ($http, BASE_URL) {
    var tas = {};

    tas.findOne = function (id, cb) {
      $http
        .get(BASE_URL + '/tas/' + id + '.json')
        .success(function (data) {
          cb(data)
        });
    };

    tas.findAll = function (cb) {
      $http
        .get(BASE_URL + '/tas.json')
        .success(function (data){
          cb(data);
        });
    };

    tas.create = function (data, cb) {
      $http
        .post(BASE_URL + '/tas.json', data)
        .success(function (res) {
          cb(res);
        });
    };

    tas.delete = function (id, cb) {
      var url = BASE_URL + '/tas/' + id + '.json';

      $http
        .delete(url)
        .success(function () {
          cb();
        });
    };

    tas.update = function (id, data, cb) {
      var url = BASE_URL + '/tas/' + id + '.json';

      $http
        .put(url, data)
        .success(function (res) {
          if (typeof cb === 'function') {
            cb(res);
          }
        });
    };

    return tas;
  })
  .controller('EditController', function ($routeParams, $location, taFactory) {
    var vm = this,
        id = $routeParams.uuid;

    taFactory.findOne(id, function(ta){
      vm.newTA = ta;
    })

    vm.addOrEditTA = function () {
      taFactory.update(id, vm.newTA, function () {
        $location.path('/tas')
      })
    }
  })
  .controller('ShowController', function ($routeParams, taFactory) {
    var vm = this,
        id = $routeParams.uuid;

    taFactory.findOne(id, function (ta) {
      vm.ta = ta;
    });

  })
  .controller('TasController', function ($location, taFactory) {
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
  });
