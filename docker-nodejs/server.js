'use strict';

// requirements
var _ = require('lodash'),
  config = require('./config/server'),
  express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

// custom
var TodoItem = require('./models/todoItem').TodoItem;
var mongoHost = 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.collection;

// DB init
mongoose.connect(mongoHost);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to mongodb: ' + mongoHost);
});

// App
var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.get('/', function(req, res) {
    res.send();
});

app.get('/api/todolist', function (req, res) {
    var promise = TodoItem.find().exec();

    promise.then(function(items) {
        res.json(items);
    }).catch(function(err) {
        res.status(500).send(err);
    });
});

app.delete('/api/todolist/completed', function (req, res) {
    var promise = TodoItem.remove({completed: true}).exec();

    promise.then(function(items) {
      var p2 = TodoItem.find().exec();
      p2.then(function(remainingItems){
        res.json(remainingItems);
      });
    }).catch(function(err) {
        res.status(500).send(err);
    });
});

app.post('/api/todolist', function(req, res) {
    var newTodoItem = new TodoItem(req.body),
        promise = newTodoItem.save();

    promise.then(function() {
        res.json(newTodoItem);
    }).catch(function(err) {
        res.status(500).send(err);
    });
});

app.get('/api/todolist/:id', function (req, res) {
    var promise = TodoItem.findById(req.params.id).exec();

    promise.then(function(item) {
        res.json(item);
    }).catch(function(err) {
        res.status(500).send(err);
    });
});

app.post('/api/todolist/:id', function(req, res) {
    var promise = TodoItem.findById(req.params.id).exec();

    promise.then(function(item) {
        if(!item) {
            throw new 'No item found!';
        } else {
            _.assignIn(item, req.body);
            return item.save();
        }
    }).then(function(item) {
        res.jsonp(item);
    }).catch(function(err) {
        res.status(500).send(err);
    });
});

app.delete('/api/todolist/:id', function(req, res) {
    var promise = TodoItem.findByIdAndRemove(req.params.id).exec();

    promise.then(function(item) {
        if(!item) {
            throw new 'No item found!';
        } else {
            res.send();
        }
    }).catch(function(err) {
        res.status(500).send(err);
    });
});

app.listen(config.port);
console.log('Running on http://localhost:' + config.port);
