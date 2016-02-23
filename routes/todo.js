var express = require('express');
var router = express.Router();
var Todo = require('../models/todoSchema');
var comp = require('../models/compSchema');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var todos = {}

    todos.getTodos = function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            comp.find(function(err, compl) {
              if (err)
                res.send(err)
              var results = {"todos": todos, "comp": compl}
              res.json(results);
            });
             // return all todos in JSON format
        });
    };

    // create todo and send back all todos after creation
   todos.postTodos = function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    };



    // delete a todo
    todos.deleteTodo = function(req, res) {
      //grab the todo and place it in a new database of completed todos
        Todo.findOne({_id: req.params.todo_id}, function(err, complete){
          if (err) return handleError(err);
          comp.create({
            text : complete.text
          }, function(err, tod) {
            if (err)
              res.send(err);
          

            Todo.remove({
               _id : req.params.todo_id
            }, function(err, todo) {
                if (err)
                   res.send(err);

                // get and return all the todos after you create another
                Todo.find(function(err, todos) {
                    if (err)
                        res.send(err)
                    comp.find(function(err, compl){
                      if (err)
                        res.send(err)
                      var results = {"todos": todos, "comp": compl};
                      res.json(results);
                    })
                    
                });
            });
          });
      });
    };


    todos.editTodo = function(req, res) {
        Todo.update({
            _id : req.params.todo_id
        },{$set:{text: req.body.text}}, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    };

    todos.home = function(req, res) {
        res.sendfile('/home/gabriel/olinjsExercises/todo/public/main.html');
        //res.sendfile('../public/main.html'); // load the single view file (angular will handle the page changes on the front-end)
    };





module.exports = todos;