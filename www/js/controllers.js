angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('TransactCtrl', function($scope, Chats, ItemsModel, PouchStorage) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

    $scope.doRefresh = function(){
      ItemsModel.konten().then(function(response){
        PouchStorage.allDocs().then(function (response) {
          console.log(response);
        })

        $scope.$broadcast('scroll.refreshComplete');
        PouchStorage.saveAccounts(response.data.data).then(function(response){
          console.log(response);
        }, function (response) {
          console.log(response);
        })
      });
    };
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('TransactDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);

})

.controller('TipCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
