angular.module('app')
.controller('listCtrl', function(itemsService) {
  // console.log(itemsService);
  console.log(this)
  
  this.handleSubmit = () => {
    itemsService.saveToDo(this.item.todo, (data) => {
      this.items = data;
    })
  }
  
})
.component('list', {
  bindings: {
    items: '<',
  },
  controller: 'listCtrl',
  templateUrl: '/templates/list.html'
});