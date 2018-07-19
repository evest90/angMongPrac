angular.module('app')
.service('itemsService', function($http) {
  this.getAll = function(callback) {
    $http.get('/items')
    .then(function({data}) {
      if(callback) {
        callback(data);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  }
  
  this.saveToDo = function(input, callback) {
    var self = this;
    $http.post('/sendToDo', {todo: input})
    .then(function({data}) {
      self.getAll(callback);
      if(callback) {
        callback(data);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  }
  
  this.deleteToDo = function(checked, callback) {
    $http.post('/deleteToDo', {todo: checked})
    .then(function({data}) {
      if (callback) {
        callback(data);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  }
  
});