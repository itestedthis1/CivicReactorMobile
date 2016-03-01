// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab' : {
          templateUrl: 'templates/home.html'
        }
      }
    })

    .state('tabs.list', {
      url: '/list',
      views: {
        'list-tab' : {
          templateUrl: 'templates/list.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.detail', {
      url: '/list/:aId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/detail.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.listProject', {
      url: '/proj',
      views: {
        'proj-tab' : {
          templateUrl: 'templates/listProject.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.detailProj', {
      url: '/proj/:aId',
      views: {
        'proj-tab' : {
          templateUrl: 'templates/detailProject.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.listBlog', {
      url: '/blog',
      views: {
        'blog-tab' : {
          templateUrl: 'templates/listBlog.html',
          controller: 'BlogController'
        }
      }
    })

    .state('tabs.detailBlog', {
      url: '/blog/:aId',
      views: {
        'blog-tab' : {
          templateUrl: 'templates/detailBlog.html',
          controller: 'BlogController'
        }
      }
    })

    .state('tabs.calendar', {
      url: '/calendar',
      views: {
        'calendar-tab' : {
          templateUrl: 'templates/calendar.html',
          controller: 'CalendarController'
        }
      }
    })


  $urlRouterProvider.otherwise('/tab/home');
})

.controller('CalendarController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/data.json').success(function(data) {
      $scope.calendar = data.calendar;


      $scope.doRefresh =function() {
      $http.get('js/data.json').success(function(data) {
          $scope.calendar = data.calendar;
          $scope.$broadcast('scroll.refreshComplete');
        });
      }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }
      $scope.onItemDelete = function(dayIndex, item) {
        $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1);
      }

    });
}])

.controller('ListController', ['$scope', '$http', '$state','$ionicModal',
    function($scope, $http, $state, $ionicModal) {
    $http.get('js/data.json').success(function(data) {
      $scope.artists = data.artists;
      $scope.whichartist=$state.params.aId;
      $scope.data = { showDelete: false, showReorder: false };

      console.log('HomeTabCtrl');

      // Load the modal from the given template URL
      $ionicModal.fromTemplateUrl('templates/modal/modal.html', function($ionicModal) {
        $scope.modal = $ionicModal;
      }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
      });

      $scope.doTheThing = function (info) {
        $scope.modal.hide();
        window.alert('Form submitted :'+info.q1);
        $scope.submitted = true;
        console.log('Form submitted!');
      };



      $scope.doRefresh =function() {
      $http.get('js/data.json').success(function(data) {
          $scope.artists = data;
          $scope.$broadcast('scroll.refreshComplete'); 
        });
      }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

      $scope.onItemDelete = function(item) {
        $scope.artists.splice($scope.artists.indexOf(item), 1);
      }

      $scope.moveItem = function(item, fromIndex, toIndex) {
        $scope.artists.splice(fromIndex, 1);
        $scope.artists.splice(toIndex, 0, item);
      };
    });
}])

.controller('BlogController', ['$scope', '$http', '$state',
  function($scope, $http, $state) {
    $http.get('js/data.json').success(function(data) {
      $scope.articles = data.articles;

      $scope.whicharticle = $state.params.aId;

      $scope.data = { showDelete: false, showReorder: false };

      $scope.onItemDelete = function(item) {
        $scope.articles.splice($scope.articles.indexOf(item), 1);
      }

      $scope.doRefresh =function() {
        $http.get('js/data.json').success(function(data) {
          $scope.articles = data;
          $scope.$broadcast('scroll.refreshComplete');
        });
      }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

      $scope.moveItem = function(item, fromIndex, toIndex) {
        $scope.articles.splice(fromIndex, 1);
        $scope.articles.splice(toIndex, 0, item);
      };
    });
  }]);
