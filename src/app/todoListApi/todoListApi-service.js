angular.module('app').service('todoListApi', ['localstorageService', 'uuid', function(localstorageService, uuid) {

    var todoList;

    var mockTodoItem = {

        id: '123456789',
        title: 'A todo',
        items: [{
                id : 1 ,
                name: 'item1',
                description: 'des of item1'
            },
            {
                id:2,
                name: 'item 2',
                description: 'des of item2'
            },
            {
                id:3,
                name: 'item3',
                description: 'des of item3'
            }
        ]
    };



    // called when adding a todo
    this.create = function() {


        var id = uuid.v4();

        var todoItem = {

            id: id,
            title: "",
            items: []

        };

        todoList.push(todoItem);
            
            localstorageService.save(todoList);
            return todoItem;
        

    }

    //called after delete a todo 
    this.updateTodos = function(id, payload) {
        console.log(' i am in update todo service the new list is : ', payload);

        todoList = payload;

        localstorageService.save(todoList);
    }
    this.updateAtodo = function(id,todo){
        console.log('i am in the api and i received the todo :', todo)
        todoList.filter(function(currentTodo){
            if(currentTodo.id === todo.id){
                currentTodo.title = todo.title ;
                currentTodo.items = todo.items;
                if(currentTodo.completed !== undefined){
                    currentTodo.completed = todo.completed
                }else{
                    currentTodo.completed = todo.completed
                }
                
            }
        })
        localstorageService.save(todoList);
    }

    //called to get all todos 
    this.getTodos = function() {

        var defer = new Promise(function(resolve, reject) {
            // if there is no data 
            if (todoList == undefined) {

                localstorageService.fetch().then(function(data) {


                    todoList = data;

                    return resolve(todoList);

                }).catch(function() {

                    // there is no data in the local storage 
                    todoList = [];
                    return resolve(todoList);

                });


            } else {
                //  if there is data in the localstorage 

                return resolve(todoList);

            }



        });



        return defer;


    }

    //called to get a particular todo
    this.getAtodo = function(id){

        var todoId = id.toString();
        if(id){
            console.log('the id : ', todoId);
            var todo = todoList.filter(function(currentTodo){
                console.log('the todo id ',currentTodo.id);
                
                {return currentTodo.id === todoId}
            })
            console.log('the returned todo : ', todo);
            return todo;
        }
    }

    this.filter = function(filter){
        console.log('from the api the searching is : ', filter.text , 'and should search in : ', todoList);
        if(filter.text === undefined){
            return todoList ;
        }
        return todoList.filter(function(todo){

            if(todo.title.indexOf(filter.text) !== -1){
                console.log('match');
                console.log('result : ', todo);
                return todo ;
            }

        });

        

    }
    


}]);