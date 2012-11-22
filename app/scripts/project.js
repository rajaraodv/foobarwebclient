'use strict'; /*global $:false  TWTR:false angular:false */

function ListCtrl($scope, Project, $http, $timeout) {
  console.log(1);
  if(!$scope.loadTwitWidget) {
    $scope.loadTwitWidget = new window.TWTR.Widget({
      id: 'twitter_widget_div',
      version: 2,
      type: 'search',
      search: 'node.js',
      interval: 20000,
      title: '',
      subject: '',
      width: 150,
      height: 800,
      theme: {
        shell: {
          background: '#ffffff',
          color: '#eeeeee'
        },
        tweets: {
          background: '#ffffff',
          color: '#444444',
          links: '#0a96c5'
        }
      },
      features: {
        scrollbar: false,
        loop: true,
        live: true,
        hashtags: true,
        timestamp: true,
        avatars: true,
        toptweets: true,
        behavior: 'default'
      }
    });
  }

  $scope.loadTwitWidget.render().start();
  $scope.$on('$routeChangeStart', function() {
    $scope.loadTwitWidget.stop();
  });

  $http.get('scripts/posts.json').success(function(data) {
    $scope.photoPosts = data;
  });

  /* Watch photocontainer and once it is populated, apply masonry*/
  $scope.container = $('#photoContainer');
  $scope.viewUpdated = false;
  $scope.$watch(function() {
    return $scope.container ? $scope.container.children().length : 0;
  }, function() {
    if(!$scope.photoPosts) {
      return;
    }
    $scope.container.imagesLoaded(function() {
      $scope.container.masonry({
        itemSelector: '.photo'
      });
    });
  });

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
      photoPost.likes_cnt = photoPost.likes_cnt + 1;
      photoPost.liked_by.push("50826c1595148ef179000039");
    };

    $scope.showCommentField = function(obj) {
      $scope.cf =  true;
    };
}

ListCtrl.$inject = ['$scope', 'Project', '$http', '$timeout'];

function PhotoCtrl($scope, $http) {
  $http.get('scripts/posts.json').success(function(data) {
    $scope.photoPosts = data;
  });
}

PhotoCtrl.$inject = ['$scope', '$http'];

function GalleryCtrl($scope, $location, Project) {
  $scope.save = function() {
    Project.save($scope.project, function(project) {
      $location.path('/edit/' + project._id.$oid);
    });
  };
}

GalleryCtrl.$inject = ['$scope', '$location', 'Project'];

function EditCtrl($scope, $location, $routeParams, Project) {
  var self = this;

  Project.get({
    id: $routeParams.projectId
  }, function(project) {
    self.original = project;
    $scope.project = new Project(self.original);
  });

  $scope.isClean = function() {
    return angular.equals(self.original, $scope.project);
  };

  $scope.destroy = function() {
    self.original.destroy(function() {
      $location.path('/list');
    });
  };

  $scope.save = function() {
    $scope.project.update(function() {
      $location.path('/');
    });
  };
}

EditCtrl.$inject = ['$scope', '$location', '$routeParams', 'Project'];


var clientAppModule = angular.module('clientApp', ['mongolab']);

clientAppModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
    controller: ListCtrl,
    templateUrl: 'views/main.html'
  }).
  when('/edit/:projectId', {
    controller: EditCtrl,
    templateUrl: 'views/detail.html'
  }).
  when('/gallery', {
    controller: GalleryCtrl,
    templateUrl: 'views/gallery.html'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);

clientAppModule.directive('showonhoverparent',  function() {
      return {
         link : function(scope, element) {
            element.parent().bind('mouseenter', function() {
                element.show();
            });
            element.parent().bind('mouseleave', function() {
                 element.hide();
            });
       }
   };
 });

clientAppModule.directive('togglecommentfield', function () {
      return {
         link : function(scope, element) {
            element.bind('click', function() {
              var commentWrap = element.parent().find('.commentWrap');
              commentWrap.toggle();
              commentWrap.find('.c11').focus();
              /*
                When comment field is toggled, we should reload masonry coz card/item's height is now increased/decreased
              */
              scope.container.masonry('reload');
            });
       }
   };
});

