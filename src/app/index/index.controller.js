(function () {
    'use strict';
    
    /**
     * Index Controller.
     */
    angular.module('app').controller('IndexController' ,['$scope', 'localstorageService','eventemmiterService', function($scope, localstorageService,eventemmiterService) {

        console.log($scope);

        $scope.todos = [];
        $scope.items = [];
        
        $scope.showItemDirective = false ;
        var indexForEdditing = 0;
        $scope.edittingMode = false ;


        localstorageService.fetch().then(function(data){
            $scope.todos = data;
        }).catch(function (err){
            console.log(err);
        });
    
       
        $scope.updateItems = function(data){
            
            if(data.name && data.description) {
                $scope.items.push(data);
                //console.log($scope.items);
            }else if(data.delete) { 
                 var newList=$scope.items.filter(function(item,index){
                   return item.name !== data.name ;
                   
            });
            $scope.items = newList;
                //console.log('im in update Items (else)', newList);
               
            }
        };
        
        $scope.addTodo = function () {

            var todo = {} ;
            todo.title = $scope.title;
            if(todo.title === undefined){
                console.log('undefined');
            }else{
                todo.createdAt = 10 ;
                todo.edittedAt = 0 ;
                todo.items = $scope.items;
                $scope.items = [];
                //console.log(todo)
                $scope.todos.push(todo);
                localstorageService.save($scope.todos);
                $scope.title = '';
            }
            
        };

        $scope.editTodo = function (Thetodo){
            
            // console.log('in edit the todo object : ', Thetodo);
            // console.log('in edit the items object : ', $scope.items);
            // console.log('in edit the $scope.todos : ', $scope.todos);
           // check why u have to click 2 times to open the tab 
            if($scope.items.length !== 0){
                $scope.showItemDirective = true ;
                $scope.showAddForm = true ;
            }else {
                $scope.showItemDirective = false ;
                $scope.showAddForm = true ;
            }
            
            $scope.todos.filter(function (todo, index){
                if(todo.title === Thetodo.title){
                    indexForEdditing = index;
                }
            });
                //console.log('the selected todo is : ', Thetodo);
                $scope.edittingMode = true ;
                $scope.title = Thetodo.title;
                $scope.edittedAt = 20 ;
                $scope.items = Thetodo.items;
                $scope.createdAt = Thetodo.createdAt;
                //console.log('index number : ', indexForEdditing);
                // console.log('in edit the todo object : ', Thetodo);
                // console.log('in edit the items object : ', $scope.items);
                // console.log('in edit the $scope.todos : ', $scope.todos);
    
        };

        $scope.saveEditting = function(){

            var theNewTodos = $scope.todos.filter(function (todo,index){
                if(index === indexForEdditing)
                {
                    
                    todo.title = $scope.title;
                    todo.edittedAt = $scope.edittedAt;
                    todo.createdAt = $scope.createdAt;
                    todo.items = $scope.items;
                }
                return todo ;
            });
            localstorageService.save($scope.todos);
            //console.log('i am in save editting', theNewTodos);
            $scope.edittingMode = false ;
            $scope.items = [];
            $scope.title = '';
        };

        $scope.removeTodo = function (Thetodo){
            //console.log('the selected todo is : ', Thetodo);
           
            var newTodoList = $scope.todos.filter(function (todo,index){
                return  todo.title !== Thetodo.title;
            });
            //console.log('the new todo list ',newTodoList);
            $scope.todos = newTodoList;
            localstorageService.save($scope.todos);
        };

        
        eventemmiterService.on('editItem',$scope);
        eventemmiterService.on('itemUpdateDone',$scope);

    }]);

})();

