'use strict'; /*global $:false  */


function MainCtrl($scope, Project, $http) {
  console.log(1);

  //G+
  $scope.gclick = function() {
    var popUp = window.open('https://plusone.google.com/_/+1/confirm?hl=en-US&url=http://foobarbar.cloudfoundry.com/', 'popupwindow', 'scrollbars=yes,width=800,height=400');
    popUp.focus();
    return false;
  };

  //FB sharing
  $scope.fbsClick = function() {
    var u = location.href;
    var t = document.title;
    window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(u) + '&t=' + encodeURIComponent(t), 'sharer', 'toolbar=0,status=0,width=626,height=436');
    return false;
  };
  //Popup Tweet window
  $scope.twtClick = function() {
    var newwindow = window.open('https://twitter.com/intent/tweet?text=Check out the Foo Bar from Cloud Foundry http://foobarbar.cloudfoundry.com', 'name', 'height=435,width=600');
    if(window.focus) {
      newwindow.focus();
    }
    return false;
  };

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

  $scope.showCommentField = function() {
    $scope.cf = true;
  };
}

MainCtrl.$inject = ['$scope', 'Project', '$http'];
