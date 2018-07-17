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
var todo = new Item();
// todo.save(function(err) {
//   if (err) return handleError(err);
// })

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

const save = (todo, callback) => {
  todo = new Item({todo: todo});
  todo.save();
}

// var addToDo = function(todo, callback) {
//   new Item()
//   Item.save({todo:todo},function(err, items) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   })
// }

module.exports.selectAll = selectAll;
module.exports.Item = Item;
module.exports.save = save;
// module.exports.addToDo = addToDo;