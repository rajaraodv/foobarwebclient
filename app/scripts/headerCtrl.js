'use strict';

function HeaderCtrl($scope) {
  $scope.loginText = 'Log In';
  $scope.loggedIn = false;
}
HeaderCtrl.$inject = ['$scope', 'Project'];