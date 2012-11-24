'use strict';
function PhotoCtrl($scope, $http) {
  $http.get('scripts/posts.json').success(function(data) {
    $scope.photoPosts = data;
  });
}

PhotoCtrl.$inject = ['$scope', '$http'];