var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', {useMongoClient:true});

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  todo: String,
});

var Item = mongoose.model('Item', itemSchema);

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};


var addToDo = function(todo) {
  var item = new Item({todo:todo})
  item.save()
  .then((items) => {
    console.log(items);
  })
  .catch(err => {
    console.log(err);
  })
}

var deleteToDo = function(todo) {
  Item.deleteOne({todo: todo})
  .then(() => {
    console.log('todo', todo);
  })
  .catch(err => {
    console.log('err', err);
  })
}

module.exports.selectAll = selectAll;
module.exports.Item = Item;
module.exports.addToDo = addToDo;
module.exports.deleteToDo = deleteToDo
