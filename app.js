//var express  = require('express');
//var app      = express();                               // create our app w/ express
//var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override');

var express = require('express');
var path = require("path");
var index = require("./routes/index");
var todo = require('./routes/todo');


var app = express();

var PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));

    //app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


app.get("/todos", todo.getTodos);
app.post("/todos", todo.postTodos);
app.delete("/todos/:todo_id", todo.deleteTodo);
app.post("/todos/:todo_id", todo.editTodo);
app.get("*", todo.home);

app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});
