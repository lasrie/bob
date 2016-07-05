angular.module('starter.services', [])

  .factory('BackendService', function ($http, $q) {
    var konteninitialized = false;
    var dbinitialized = false;
    var db;
    var kontendb;

    var _konten = function () {
      return $http({
        method: 'GET',
        url: 'https://bobp1942109941trial.hanatrial.ondemand.com/bob/AccountBalance?summarized=0',
        headers:{
          'Authorization':'asdasd'
        }
      });
    };

    return {
      init: function () {
        var deferred = $q.defer();
        new PouchDB('bank').then(function (response) {
          db = response;
          dbinitialized = true;
          new PouchDB('kontendb').then(function (response) {
            kontendb = response;
            konteninitialized = true;
            $q.resolve();
          }, function(error){
            $q.reject(error);
          });
        }, function(error){
          $q.reject(error);
        });
        return deferred.promise;
      },
      konten: function () {
        return $http({
          method: 'GET',
          url: 'https://bobp1942109941trial.hanatrial.ondemand.com/bob/AccountBalance?summarized=0'
        });
      },

      transactions: function(){
        return $http({
          method: 'GET',
          url: 'https://bobp1942109941trial.hanatrial.ondemand.com/bob/TransactionHistory'


        })
      },
      retrieveAccounts: function () {
        var deferred = $q.defer();
        _konten().then(function (response) {
          console.log(db);
          console.log(kontendb);
          console.log(response);
          if (dbinitialized && konteninitialized) {
            PouchStorage.saveAccountRequest(response).then(function (response2) {
              $q.resolve(response.data);
            }, function (response) {
              $q.reject(response);
            })
          } else {
            $q.reject("DB not resolved");
          }

        });
        return deferred.promise;
      },

      //DB Functions---------------------------------------------
      saveAccount: function (account) {
        var deferred = $q.defer();
        db.post(account).then(function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      },
      saveAccounts: function (accounts) {
        console.log(db);
        console.log(accounts);
        var deferred = $q.defer();
        db.bulkDocs(accounts).then(function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error);
        });
        return deferred.promise;

      },
      saveTransaction: function (transaction) {
        var deferred = $q.defer();
        db.post(account).then(function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      },
      saveAccountRequest: function (response) {
        console.log(kontendb);
        var data = response.data;
        var total = data.total;
        var details = data.details;
        var newDetails = [];
        angular.forEach(details, function (key, value) {
          value.dataType = "konto";
          newDetails[key] = value;
        });
        db.bulkDocs(newDetails);
      },
      saveTransactions: function (transactions) {
        var deferred = $q.defer();
        db.bulkDocs(accounts).then(function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      },
      allDocs: function () {
        var deferred = $q.defer();
        db.allDocs().then(function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      },
      getAccounts: function () {
        var deferred = $q.defer();
        kontendb.allDocs().then(function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      }
    }
  });
