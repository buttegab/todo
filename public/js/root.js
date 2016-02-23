var app = angular.module('myApp', ['ngRoute']);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get("/todos")
        .success(function(data) {
            $scope.todos = data.todos;
            $scope.compl = data.comp;

            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post("/todos", $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete("/todos/" + id)
            .success(function(data) {
                $scope.todos = data.todos;
                $scope.compl = data.comp;
                
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    //edits a todo after it has been made
    $scope.editTodo = function(id) {
        $http.post("/todos/" + id, $scope.formData)
            .success(function(data) {
                $scope.todos = data;
                
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}