angular
  .module('tas', [])
  .controller('TasController', function () {
    var tas = this;

    tas.data = ['TAdam','ZAdam','JuAdam','BrAdam','BAdam'];

    tas.removeTA = function (name) {
      var index = tas.data.indexOf(name);
      tas.data.splice(index, 1);
    }
  });
