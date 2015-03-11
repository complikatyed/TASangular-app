angular
  .module('tas')
  .controller('AuthController', AuthController)

function AuthController ($scope, $location, BASE_URL) {
  var vm = this;

  vm.login = function () {
    var fb = new Firebase (BASE_URL);

    fb.authWithPassword({
      email:    vm.email,
      password: vm.password
    }, function (err, authData) {
      if (err) {
        console.log('Login failed!', err);
      } else {
        console.log('Login success!', authData);
        $location.path('/tas');
        $scope.$apply();
      }
    });
  };

  vm.register = function () {
    var fb = new Firebase (BASE_URL);

    fb.createUser({
      email:    vm.email,
      password: vm.password
    }, function (err, authData) {
      if (err && err.code === 'EMAIL_TAKEN'){
        console.log('Error creating user:', err);
        vm.login();
      } else if (err) {
        console.log('Error creating user:', err)
      } else {
        console.log('User created successfully', authData);
        vm.login();
      }
    });
  };

  vm.forgotPassword = function () {
    var fb = new Firebase (BASE_URL);

    fb.resetPassword({
      email:    vm.email,
      password: vm.password
    }, function (err) {
      if (err){
        console.log('Error resetting password:', err);
      } else {
        console.log('Password reset email sent successfully');
      }
    });
  }
}