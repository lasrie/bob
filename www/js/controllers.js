angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, BackendService) {
    var _response;
    $scope.total;
    BackendService.konten().then(function (response) {
      console.log(response);
      $scope.total = response.data.total;
      $scope.currency = response.data.currency;
      $scope.konten = response.data.details;
      _response = response;
      console.log($scope.total);
    }, function (error) {
    });

    BackendService.init().then(function () {
      BackendService.saveAccountRequest(_response);
    }, function (error) {
      consolee.log(error);
    })
  })

  .controller('TransactCtrl', function ($scope, BackendService) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.doRefresh = function () {
      BackendService.konten().then(function (response) {
        console.log(response);

        $scope.$broadcast('scroll.refreshComplete');

      });
      //PouchStorage.saveAccounts(response.data.data).then(function(response){
      //  console.log(response);
      //}, function (response) {
      //  console.log(response);
      //})
    }
  }
)

  .
  controller('TransactDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);

  })

  .controller('TipCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
