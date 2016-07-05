angular.module('starter.services', [])
  .factory('ItemsModel', function ($http, Backand) {
    return {
      konten: function () {
        return $http({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/objects/Konto',
          params: {
            pageSize: 20,
            pageNumber: 1,
            filter: null,
            sort: ''
          }
        });
      }
    }

  })

  .factory('PouchStorage', function ($q) {
    var db = new PouchDB('bank').then(function(response){
      db = response;
    });
    return {
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
      saveTransactions: function (transactions) {
        var deferred = $q.defer();
        db.bulkDocs(accounts).then(function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      },
      allDocs: function(){
        var deferred = $q.defer();
        db.allDocs().then(function(response){
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      }
    }
  })

  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  });
