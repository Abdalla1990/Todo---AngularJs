angular.module('app').controller('todoDashboardController', ['$scope', 'todoListApi', function($scope, todoListApi) {

    console.log(' i am the controller of dashboard', $scope)
    //localStorage.clear();
   
   
    
   
   
   
    $scope.filterTodos = function(filter){

        if(filter){
            var newList = todoListApi.filter(filter);
            console.log('the new list before assigning is : ', newList);
            $scope.todoList= [];
            var filteredTodos = [];
           
            if(filter.selectedFilter==='completed'){
             
                newList.map(function(todo){
                
                    if(todo.completed){
                 
                        console.log('i know that there is completed flag');
                 
                        filteredTodos.push(todo) ;
                  
                    }else {
                  
                        return ;
                  
                    }
               
                });
            
                newList=filteredTodos;
            } else if(filter.selectedFilter==='incompleted'){
             
                newList.map(function(todo){
                
                    if(!todo.completed){
                 
                        console.log('i know that there is incompleted flag');
                 
                        filteredTodos.push(todo) ;
                  
                    }else {
                  
                        return ;
                  
                    }
               
                });
            
                newList=filteredTodos;
            }
            console.log(' the new map : ', newList);
            $scope.todoList = newList ;
            console.log('the new list is : ', $scope.todoList);
            
        }else {
            todoListApi.getTodos().then(function(todoList) {
                
                       
                        $scope.todoList = todoList;
                
                        if(todoList){
                           $scope.showHints = true ;
                        }
                
                
                        console.log(todoList);
                
                        $scope.$digest();
                
                    });
        }
       
    }

    $scope.showHints = false ;
    todoListApi.getTodos().then(function(todoList) {

        //localStorage.clear();
        $scope.todoList = todoList;

        if(todoList){
           $scope.showHints = true ;
        }


        console.log(todoList);

        $scope.$digest();

    });

    $scope.delete = function(deletedTodo) {


        var newList = $scope.todoList.filter(function(todo) {
            if (todo === deletedTodo) {
                return;
            }
            return todo;
        })

        console.log('new list', newList);

        $scope.todoList = newList;
        todoListApi.updateTodos(undefined, newList);

    }

   
    $scope.completed = function(completedTodo){
       
        selectedTodo = todoListApi.getAtodo(completedTodo.id);
        
        if(selectedTodo[0].completed !== undefined && selectedTodo[0].completed === true){
            selectedTodo[0].completed= false ;
        }else {
            selectedTodo[0].completed= true ;
        }
        console.log('selected todo : ', selectedTodo[0]);

        todoListApi.updateAtodo(selectedTodo[0].id,selectedTodo[0]);



    }
   

     




}]);