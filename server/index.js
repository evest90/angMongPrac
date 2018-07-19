var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/sendToDo', function(req, res) {
  items.addToDo(req.body.todo)
  res.send(req.body.todo);
})

app.post('/deleteToDo', function(req, res) {
  items.deleteToDo(req.body.todo);
  res.sendStatus(201);
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
 
