angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, BackendService) {
    var _response;
    $scope.total;
    BackendService.konten().then(function (response) {
      console.log(response);
      $scope.total = response.data.total;
      $scope.currency = response.data.currency;
      $scope.konten = response.data.details;
      var numbers = [];
      var legends = [];
      angular.forEach($scope.konten, function(key, value){
        //numbers.append()
        angular.forEach(key, function(key2, value2){
          if(value2 != "currency"){
            console.log(key2);
            numbers.push(key2);
            console.log(value2);
            legends.push(value2);

            //console.log(value2);
          }
        });
      });
      $scope.graphNumbers = numbers;
      $scope.graphLegends = legends;
      $scope.pieChart($scope.graphNumbers, $scope.graphLegends);
      _response = response;
      console.log($scope.total);
    }, function (error) {
    });

    BackendService.init().then(function () {
      BackendService.saveAccountRequest(_response);
      console.log("init vorbei");
    }, function (error) {
      console.log(error);
    })


    $scope.pieChart = function (data, labels) {
      var chartData = {
        labels: labels,
        datasets: [{data: data}]
      };
      var ctx = document.getElementById("piechart").getContext("2d");
      ;
      console.log(ctx);
      var options = {
        legend: {
          display: false
        },
        cutoutPercentage: 80,
        animateScale: true
      };
      var data = {
        labels: [
          "Red",
          "Blue",
          "Yellow"
        ],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
            ]
          }]
      };

      $scope.pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: options
      });
    }

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
      $scope.transactions;// window.localStorage.getItem('transactions');
      BackendService.transactions().then(function (response) {
        console.log(response);
        $scope.transactions = response.data;
        //window.localStorage.setItem("transactions", response.data);
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
  controller('TransactDetailCtrl', function ($scope, $stateParams) {
    $scope.transactId = $stateParams.transactId;

    console.log($stateParams);
  })

  .controller('TipCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
