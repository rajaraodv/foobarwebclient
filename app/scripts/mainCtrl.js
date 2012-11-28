/*global $:false */
/*jshint camelcase:false */
'use strict';


function MainCtrl($scope, Project, PhotoPostService, $http) {
  $scope.photoPosts = PhotoPostService.query();

  $scope.container = $('#photoContainer');
  $scope.container.imagesLoaded(function() {
    $scope.container.masonry({
      itemSelector: '.photo'
    });
  });

  $scope.toggleLikeBtnName = function (photoPost) {
    return $.inArray($scope.appUser._id, photoPost.liked_by) === 0 ? 'Unlike' : 'Like' ;
  };

  $scope.toggleLikeBtnIcon = function (photoPost) {
    return $.inArray($scope.appUser._id, photoPost.liked_by) === 0 ? 'icon-thumbs-down' : 'icon-thumbs-up' ;
  };

  /* Pluralize Like and Comments */
  $scope.pluralizeLikes = {
    0: '',
    one: '{} like',
    other: '{} likes'
  };

  $scope.pluralizeComments = {
    0: '',
    one: '{} comment',
    other: '{} comments'
  };

  $scope.like = function(photoPost) {
    if(!$scope.loggedIn) {
      return;
    }
    var requestConfig = {
      'method': 'POST',
      'url': '/likes',
      'data': {
        'post_id': photoPost._id
      },
      headers: {
        'Content-Type': 'application/json',
        'X-foobar-username': $scope.appUser.username,
        'X-foobar-access-token': $scope.appUser.access_token
      }
    };
    var response = $http(requestConfig);

    response.success(function(data, status, headers, config) {
      photoPost.likes_cnt = photoPost.likes_cnt + 1;
      photoPost.liked_by.push($scope.appUser._id);
    });

    response.error(function(data, status, headers, config) {
    });

  };

  $scope.showCommentField = function() {
    if(!$scope.loggedIn) {
      return;
    }
    $scope.cf = true;
  };
}

MainCtrl.$inject = ['$scope', 'Project', 'PhotoPostService', '$http'];