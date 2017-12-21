angular.module('app').controller('todoEditorController',['uuid','$scope', '$routeParams', 'todoListApi', function(uuid,$scope, $routeParams, todoListApi){



 $scope.editingMode = false ;
 $scope.taskItems = [];
 $scope.aTaskItem ;
 $scope.hideTaskDirective = true ;
 $scope.hideNewItemButton = false;
//If no todo id is being passed, create a new to do item and inject it in the component.    
if($routeParams.todoId == undefined) {


    var todoItem = todoListApi.create();

     $scope.todoItem = todoItem ;
     $scope.taskItems = todoItem.items;
    console.log('scope in controllwer', $scope);

}

 if ($routeParams.todoId !== undefined){
    $scope.editingMode = true ;
    // console.log('here in editor with todo id : ', $routeParams.todoId);
    var todo = todoListApi.getAtodo($routeParams.todoId);
    console.log('the returned todo : ', todo);
    $scope.todoItem = todo[0] ;
    $scope.taskItems = todo[0].items;
     
}

// a parent method to update the taskitems array from the child component taskItem-directive

$scope.updateItems = function(data){
    
    console.log('i am inside updateItems action : ', data);
    $scope.hideNewItemButton = true;
    
    $scope.aTaskItem.name =  data.name;
    $scope.aTaskItem.description =  data.description;
    $scope.aTaskItem.url =  data.url;

    var itemExist = false ;
    for (var i in $scope.todoItem.items){

       if($scope.todoItem.items[i].id === $scope.aTaskItem.id) {

        $scope.todoItem.items[i].name = $scope.aTaskItem.name;
        $scope.todoItem.items[i].description = $scope.aTaskItem.description ;
        $scope.todoItem.items[i].url = $scope.aTaskItem.url ;
        itemExist = true ;
        break;
       }

    }
    if(itemExist === false){

        $scope.todoItem.items.push($scope.aTaskItem);
        
    }

    todoListApi.updateAtodo($scope.todoItem.id,$scope.todoItem);

    $scope.hideTaskDirective = true ;
    $scope.hideNewItemButton = false;
   
   
};

// a handeler to handel update taskItem (update click)
$scope.updateItemHandler = function(item){
    
    $scope.hideTaskDirective = false ;
    $scope.hideNewItemButton = true;
    console.log('i am in update item',item);
   
    
    $scope.aTaskItem = item ;


    // // gets called when the update button is clicked so the child component can fill the name and des fileds
    // $scope.notify = function(){

    // }
    
};

$scope.addItem = function(){
    console.log('im here ');
    $scope.hideTaskDirective = false ;
    $scope.hideNewItemButton = false;
   
     var item = {
       
        
        id: uuid.v4(),
        name : 'item text',
        description: 'item description',
        

    }

   $scope.aTaskItem = item ;
   
};

$scope.removeItemHandler = function(item){
    console.log('i am in remove item',item);
    
    var newItemList = $scope.todoItem.items.filter(function(currentItem){

        if(currentItem.id === item.id){
            console.log('i found it');
            return
        }else{
            return currentItem ;
        }


    });
    
    $scope.todoItem.items = newItemList;
    todoListApi.updateAtodo($scope.todoItem.id,$scope.todoItem);
    $scope.taskItems = newItemList;
    
    
};

var receivedItem;
$scope.showMoveButton = false ;
$scope.moveItemHandler = function(item){

    // when move item to another todo button is clicked
    if(item){
        $scope.showMoveButton = true ;
        console.log('i am in move item',item);
        receivedItem = item;
        console.log('received item is : ',receivedItem);
        todoListApi.getTodos().then(function(todos){
            
                    $scope.todos = todos ;
        });
       // when move button is clicked
    }else {
        // this todo is the title only
        console.log('selected todo id is : ',$scope.selectedTodo);
        console.log('received item is : ',receivedItem);

        todoListApi.getTodos().then(function(todos){
            
            // retriving the full object
            var selectedTodoObject = todos.filter(function(todo){

                if(todo.title === $scope.selectedTodo){
                    return todo
                }else {
                    return ;
                }
            });

        console.log('selected todo Object : ', selectedTodoObject);
        var UpdatedTodo = todoListApi.getAtodo(selectedTodoObject[0].id); 
        UpdatedTodo[0].items.push(receivedItem);
        console.log('current todo : ', $scope.todoItem);
        var updatedItemList = $scope.todoItem.items.filter(function(item){
            if(item.id === receivedItem.id){
                return ;

            } else{
                return item ;
            }
        });
        $scope.todoItem.items = updatedItemList ;
        todoListApi.updateAtodo($scope.todoItem.id,$scope.todoItem);
        $scope.taskItems = updatedItemList;
        $scope.showMoveButton = false ;
        });


        
    }
};





}]);